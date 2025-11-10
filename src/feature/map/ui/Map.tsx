"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [127.0, 37.5],
      zoom: 9,
    });

    map.on("load", () => {
      const landLayers = ["land", "landcover", "landuse"];

      landLayers.forEach((layer) => {
        try {
          if (map.getLayer(layer)) {
            map.setPaintProperty(layer, "fill-color", "#ffe3ed"); // 핑크
          }
        } catch (err) {
          console.warn(`레이어 수정 실패: ${layer}`, err);
        }
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} className="w-full h-screen shadow-md" />;
}

