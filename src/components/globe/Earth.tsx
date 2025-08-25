import { useEffect, useRef } from 'react';
import type { GlobeInstance } from 'globe.gl';
import { initGlobe } from './settings/init';
import { setMaterial } from './settings/material';
import { setLabels } from './settings/label';
import { applyControls } from './settings/control';
import { useAppSelector } from '../../redux/hook';
import { styled } from 'styled-components';
import { useKeyboardShortcuts, ShortcutsHelp } from '../../hooks/useKeyboardShortcuts';
import type { LocationInfo, LocationQuantityInfo } from '../../type';

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
    isPortSidebarCollapsed: boolean;
    showHelp?: boolean;
    onHelpToggle?: () => void;
    onAISummaryToggle?: () => void;
}) => {
    const refContainer = useRef<HTMLDivElement>(null);
    const refGlobe = useRef<GlobeInstance | null>(null);

    const currentYear = useAppSelector((state) => state.year.currentYear);

    const earthData = useAppSelector((state) => state.loader.data?.earthData);

    const setGlobe = () => {
        const globe = refGlobe.current!;
        if (!earthData || !currentYear) {
            globe.arcsData([]).labelsData([]);
            return;
        }

        if (!earthData) {
            setLabels(globe, []);
            return;
        }

        const yearItems = earthData.filter((it) => {
            if (!it?.date) return false;
            const d = new Date(it.date);
            if (Number.isNaN(d.getTime())) return false;
            return d.getFullYear() === Number(currentYear);
        });

        // aggregate totals by city (use from and to locations)
        const map: Record<string, LocationQuantityInfo> = {};
        yearItems.forEach((it) => {
            const qty = it.quantity ?? 0;
            const add = (loc: LocationInfo) => {
                if (!loc || !loc.location) return;
                const location = loc.location;
                if (!map[location])
                    map[location] = { location, latitude: loc.latitude, longitude: loc.longitude, quantity: 0 };
                map[location].quantity += qty;
            };
            add(it.from);
            add(it.to);
        });

        const labelsData = Object.values(map);
        setLabels(globe, labelsData);
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
    }, [earthData, currentYear]);

    useEffect(() => {
        if (refGlobe.current && refContainer.current) {
            const container = refContainer.current;
            const containerWidth = container.clientWidth;

            // Calculate horizontal offset based on both sidebars
            let translateX = 0;

            // Adjust for port sidebar (right side)
            if (!props.isPortSidebarCollapsed) {
                translateX += containerWidth * 0.1; // Move right when port sidebar is expanded
            }

            // Apply the calculated transform to center the globe
            container.style.transform = `translateX(${translateX}px)`;
        }
    }, [props.isPortSidebarCollapsed]);

    // Setup keyboard shortcuts
    const { shortcuts } = useKeyboardShortcuts({
        globe: refGlobe.current,
        isEnabled: true,
        onAISummaryToggle: props.onAISummaryToggle,
    });

    // Handle help toggle with H key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key.toLowerCase() === 'h' && !event.ctrlKey && !event.metaKey) {
                const target = event.target as HTMLElement;
                if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                    event.preventDefault();
                    props.onHelpToggle?.();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
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
