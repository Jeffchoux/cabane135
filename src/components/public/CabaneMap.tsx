"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const CABANE_135 = { lng: -1.202009, lat: 46.20415 };

export function CabaneMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!TOKEN || !containerRef.current || mapRef.current) return;
    mapboxgl.accessToken = TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [CABANE_135.lng, CABANE_135.lat],
      zoom: 15.2,
      pitch: 0,
      attributionControl: false,
      logoPosition: "bottom-right",
      cooperativeGestures: true,
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false, visualizePitch: false }), "top-right");

    map.on("style.load", () => {
      const safeSet = (id: string, prop: string, value: string) => {
        try {
          if (map.getLayer(id)) {
            // @ts-expect-error - dynamic property name
            map.setPaintProperty(id, prop, value);
          }
        } catch {
          /* ignore */
        }
      };
      safeSet("water", "fill-color", "#0a1628");
      safeSet("background", "background-color", "#0f2035");
      safeSet("land", "background-color", "#13263f");
      safeSet("road-primary", "line-color", "rgba(242,236,224,0.45)");
      safeSet("road-secondary-tertiary", "line-color", "rgba(242,236,224,0.3)");
      safeSet("road-street", "line-color", "rgba(242,236,224,0.18)");
    });

    const el = document.createElement("div");
    el.className = "cabane-pin";
    el.setAttribute("aria-label", "Cabane 135");
    el.innerHTML = `
      <span class="cabane-pin-label">135</span>
      <span class="cabane-pin-stem"></span>
      <span class="cabane-pin-dot"></span>
    `;
    new mapboxgl.Marker({ element: el, anchor: "bottom" })
      .setLngLat([CABANE_135.lng, CABANE_135.lat])
      .addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  if (!TOKEN) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[var(--ocean)] text-white/40 text-sm">
        Carte indisponible (NEXT_PUBLIC_MAPBOX_TOKEN manquant)
      </div>
    );
  }

  return <div ref={containerRef} className="h-full w-full" />;
}
