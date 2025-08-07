import { useEffect, useRef } from "react";
import type { GlobeInstance } from "globe.gl";
import { initGlobe } from "./settings/init";
import { setMaterial } from "./settings/material";
import { setLabels } from "./settings/label";
import { applyControls } from "./settings/control";
import { useAppSelector } from "../../redux/hook";
import { styled } from "styled-components";
import {
  useKeyboardShortcuts,
  ShortcutsHelp,
} from "../../hooks/useKeyboardShortcuts";

const GlobeContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  .float-tooltip-kap {
    z-index: 2;
  }
  canvas {
    z-index: 1;
  }
`;

export const GlobeEarth = (props: {
  isDashboardCollapsed?: boolean;
  isPortSidebarCollapsed: boolean;
  showHelp?: boolean;
  onHelpToggle?: () => void;
  onAISummaryToggle?: () => void;
}) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refGlobe = useRef<GlobeInstance | null>(null);

  const currentYear = useAppSelector((state) => state.year.currentYear);

  const outsourcingEmployeeData = useAppSelector(
    (state) => state.loader.data?.outsourcingEmployeeData
  );

  const setGlobe = () => {
    const globe = refGlobe.current!;
    if (!outsourcingEmployeeData || !currentYear) {
      globe.arcsData([]).labelsData([]);
      return;
    }

    setLabels(
      globe,
      outsourcingEmployeeData.find((item) => item.year === currentYear)?.data ||
        []
    );
  };

  useEffect(() => {
    refGlobe.current = initGlobe(refContainer.current!);
    const timer = setMaterial(refGlobe.current);
    applyControls(refGlobe.current, refContainer.current!);
    setGlobe();
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setGlobe();
  }, [outsourcingEmployeeData, currentYear]);

  useEffect(() => {
    if (refGlobe.current && refContainer.current) {
      const container = refContainer.current;
      const containerWidth = container.clientWidth;

      // Calculate horizontal offset based on both sidebars
      let translateX = 0;

      // Adjust for dashboard sidebar (left side)
      if (!props.isDashboardCollapsed) {
        translateX -= containerWidth * 0.1; // Move left when dashboard is expanded
      }

      // Adjust for port sidebar (right side)
      if (!props.isPortSidebarCollapsed) {
        translateX += containerWidth * 0.1; // Move right when port sidebar is expanded
      }

      // Apply the calculated transform to center the globe
      container.style.transform = `translateX(${translateX}px)`;
    }
  }, [props.isDashboardCollapsed, props.isPortSidebarCollapsed]);

  // Setup keyboard shortcuts
  const { shortcuts } = useKeyboardShortcuts({
    globe: refGlobe.current,
    isEnabled: true,
    onAISummaryToggle: props.onAISummaryToggle,
  });

  // Handle help toggle with H key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "h" && !event.ctrlKey && !event.metaKey) {
        const target = event.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
          event.preventDefault();
          props.onHelpToggle?.();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [props.onHelpToggle]);

  return (
    <>
      <GlobeContainer ref={refContainer} />

      <ShortcutsHelp
        shortcuts={shortcuts}
        isVisible={props.showHelp || false}
        onClose={() => props.onHelpToggle?.()}
      />
    </>
  );
};
