"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { getGeoCoding } from "@/src/infrastructure/geo/geo";
import { useFlightStore } from "../../flight/model/flightStore";
import type { Feature, LineString } from "geojson";

const ORIGIN: [number, number] = [127.0, 37.5];

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
  
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
  
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/yujineee/cmih7nyc9000q01sq8t7rcl39",
      center: ORIGIN,
      zoom: 7.3,
    });
    map.on("load", async () => {
      // 1. 출발지 마커
      new mapboxgl.Marker({ color: "blue", scale: 2.1 })
        .setLngLat(ORIGIN)
        .addTo(map);
    
      const destination =
        useFlightStore.getState().destination;
    
      if (!destination) return;
    
      const destinationGeo = await getGeoCoding(destination);
    
      // 2. 도착지 마커
      new mapboxgl.Marker({ color: "red", scale: 2.1 })
        .setLngLat(destinationGeo)
        .addTo(map);
    
      // 3. 비행 경로 GeoJSON
      const routeGeoJSON: Feature<LineString> = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            ORIGIN,
            destinationGeo,
          ],
        },
        properties: {}, 
      };
    
      // 4. source 추가
      map.addSource("flight-route", {
        type: "geojson",
        data: routeGeoJSON,
      });
    
      // 5. layer 추가 (선 스타일)
      map.addLayer({
        id: "flight-route-line-runtime",
        type: "line",
        source: "flight-route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#ffffff", // 하늘색
          "line-width": 7,
          "line-opacity": 1,
        },
      });
  
      map.fitBounds(
        [ORIGIN, destinationGeo],
        { padding: 120 }
      );
    });
    
    return () => {
      map.remove();
    };
  }, []);



  return(
    <div className="relative w-full h-screen shadow-md">
    <div ref={mapContainer} className="w-full h-full" />
  </div>
  ) 
}

