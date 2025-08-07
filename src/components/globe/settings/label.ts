import type { GlobeInstance } from "globe.gl";
import { BufferGeometry, Group, Line, LineBasicMaterial, Vector3 } from "three";
import { renderPortTooltip } from "../../PortTooltipRenderer";
import _ from "lodash";
import type { EmployeeType } from "../../../type";
import { greatCircleDistance } from "./material";

export const setLabels = (
  globe: GlobeInstance,
  employeeData: EmployeeType[]
) => {
  const { labels, labelAltitudes } = convertLabelData(employeeData);

  globe
    .labelsData(labels)
    .labelLat((d: any) => d.lat)
    .labelLng((d: any) => d.lng)
    .labelText((d: any) => {
      return `${d.city}\n(${d.employeeCount})`;
    })
    // Label size based on employee count
    .labelSize((d: any) => {
      return Math.max(0.8, Math.min(2.5, Math.sqrt(d.employeeCount) * 0.08));
    })
    // Dot radius based on employee count
    .labelDotRadius((d: any) => {
      const minRadius = 0.15;
      const maxRadius = 0.8;
      const scale = Math.sqrt(d.employeeCount) * 0.025;
      return Math.max(minRadius, Math.min(maxRadius, scale));
    })
    // Label color by port type
    .labelColor((d: any) =>
      d.type === "from" ? "#00ffe7" : "rgba(255, 165, 0, 0.9)"
    )
    .labelResolution(8) 
    .labelAltitude((d: any) => labelAltitudes[d.port] || 0)
    .labelDotOrientation("top")
    .labelIncludeDot(true)
    // Custom HTML label tooltip using styled component
    .labelLabel((d: any) => {
      return renderPortTooltip(d);
    })
    .labelsTransitionDuration(0);

  // --- BEGIN: Add vertical lines from earth surface to label dots ---
  let labelLinesGroup: Group | null = null;
  if (globe.scene().getObjectByName("labelLinesGroup")) {
    labelLinesGroup = globe.scene().getObjectByName("labelLinesGroup") as Group;
    globe.scene().remove(labelLinesGroup);
  }
  labelLinesGroup = new Group();
  labelLinesGroup.name = "labelLinesGroup";
  const RADIUS = globe.getGlobeRadius ? globe.getGlobeRadius() : 1; // fallback to 1 if not available
  labels.forEach((d) => {
    const alt = labelAltitudes[d.port] || 0;
    if (alt > 0) {
      // Convert lat/lng to 3D positions
      const latRad = (d.lat * Math.PI) / 180;
      const lngRad = (d.lng * Math.PI) / 180;
      // Surface point
      const r0 = RADIUS;
      const x0 = r0 * Math.cos(latRad) * Math.sin(lngRad);
      const y0 = r0 * Math.sin(latRad);
      const z0 = r0 * Math.cos(latRad) * Math.cos(lngRad);
      // Label dot point (globe.gl altitude is relative to radius)
      const r1 = RADIUS * (1 + alt);
      const x1 = r1 * Math.cos(latRad) * Math.sin(lngRad);
      const y1 = r1 * Math.sin(latRad);
      const z1 = r1 * Math.cos(latRad) * Math.cos(lngRad);
      // Create geometry
      const geometry = new BufferGeometry().setFromPoints([
        new Vector3(x0, y0, z0),
        new Vector3(x1, y1, z1),
      ]);
      const material = new LineBasicMaterial({
        color: 0xffa500,
        linewidth: 2,
      });
      const line = new Line(geometry, material);
      labelLinesGroup.add(line);
    }
  });
  globe.scene().add(labelLinesGroup);
};

const LABEL_BASE_ALT = 0;
const LABEL_STEP_ALT = 0.1;
const LABEL_DIST_THRESHOLD = 4;
const LABEL_MAX_LAYER = 4;

export const convertLabelData = (employeeData: EmployeeType[]) => {
  const labelAltitudes: Record<string, number> = {};

  const sortedPorts = employeeData.map((item) => {
    return { ...item, port: item.city };
  });

  for (let i = 0; i < sortedPorts.length; i++) {
    const p = sortedPorts[i];
    let layer = 0;
    for (let j = 0; j < i; j++) {
      const q = sortedPorts[j];
      const dist =
        (greatCircleDistance(
          { lat: p.lat, lng: p.lng },
          { lat: q.lat, lng: q.lng }
        ) *
          180) /
        Math.PI;
      if (
        dist < LABEL_DIST_THRESHOLD &&
        labelAltitudes[q.port] / LABEL_STEP_ALT === layer
      ) {
        layer++;
        if (layer > LABEL_MAX_LAYER) break;
      }
    }

    labelAltitudes[p.port] =
      layer === 0 ? 0 : LABEL_BASE_ALT + layer * LABEL_STEP_ALT;
  }

  return {
    labelAltitudes,
    labels: sortedPorts,
  };
};
