"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { getGeoCoding } from "@/src/infrastructure/geo/geo";
import { useSearchParams } from "next/navigation";
const ORIGIN: [number, number] = [127.0, 37.5];

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const SearchParams = useSearchParams()
  const des = SearchParams.get("destination")

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/yujineee/cmih7nyc9000q01sq8t7rcl39",
      center: ORIGIN,
      zoom: 7.3,
    });

  (async () => {
    const destination = await getGeoCoding(String(des));
    
   new mapboxgl.Marker({ color: "blue", scale: 2.1 })
      .setLngLat(ORIGIN)
      .addTo(map);
     

    new mapboxgl.Marker({ color: "red", scale: 2.1 })
      .setLngLat(destination)
      .addTo(map);
    
  })();

    return () => map.remove();
  }, []);

  return(
    <div className="relative w-full h-screen shadow-md">
    <div ref={mapContainer} className="w-full h-full" />
  </div>
  ) 
}

