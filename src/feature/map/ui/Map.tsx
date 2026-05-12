"use client";

import { useEffect, useRef } from "react";
import { useFlightStore } from "../../flight/model/flightStore";
import type { Feature, Point, LineString } from "geojson";

const ORIGIN: [number, number] = [127.0, 37.5];

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const animationRef = useRef<number | null>(null);
  const isFlyingRef = useRef<boolean>(false);

  const isFlying = useFlightStore((s) => s.isFlying);
  const isPaused = useFlightStore((s) => s.isPaused);
  const destination = useFlightStore((s) => s.destination);
  const startedAt = useFlightStore((s) => s.startedAt);
  const estimatedMinutes = useFlightStore((s) => s.estimatedMinutes);
  const accumulatedMinutes = useFlightStore((s) => s.accumulatedMinutes);

  useEffect(() => {
    isFlyingRef.current = isFlying && !isPaused;
    if (isPaused && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, [isFlying, isPaused]);

  // 지도 초기화 - mapboxgl 동적 import
  useEffect(() => {
    if (!mapContainer.current) return;

    let map: mapboxgl.Map;

    const initMap = async () => {
      // 동적 import로 변경 - 페이지 로드 블로킹 제거
      const mapboxgl = (await import("mapbox-gl")).default;

      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

      map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/yujineee/cmkfkf28900ml01svd8fu9126",
        center: ORIGIN,
        zoom: 7.3,
      });

      mapRef.current = map;
    };

    initMap();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      mapRef.current?.remove();
    };
  }, []);

  // 비행 로직 - turf 동적 import
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!isFlying && !isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (map.getLayer("plane-layer")) map.removeLayer("plane-layer");
      if (map.getLayer("flight-route-line"))
        map.removeLayer("flight-route-line");
      if (map.getSource("plane")) map.removeSource("plane");
      if (map.getSource("flight-route")) map.removeSource("flight-route");
      document.querySelectorAll(".mapboxgl-marker").forEach((m) => m.remove());
      map.easeTo({
        center: ORIGIN,
        zoom: 7.3,
        bearing: 0,
        pitch: 0,
        duration: 800,
      });
      return;
    }

    if (!isFlying && isPaused) return;
    if (isPaused) return;

    const isResume = !!map.getSource("plane");

    const startFlight = async () => {
      if (!destination) return;

      // turf, mapboxgl, geocoding 동시에 로드
      const [{ default: mapboxgl }, turf, { getGeoCoding }] = await Promise.all(
        [
          import("mapbox-gl"),
          import("@turf/turf"),
          import("@/src/infrastructure/geo/geo"),
        ],
      );

      const destinationGeo = await getGeoCoding(String(destination));

      document.querySelectorAll(".mapboxgl-marker").forEach((m) => m.remove());
      new mapboxgl.Marker({ color: "blue", scale: 2 })
        .setLngLat(ORIGIN)
        .addTo(map);
      new mapboxgl.Marker({ color: "red", scale: 2 })
        .setLngLat(destinationGeo)
        .addTo(map);

      if (!map.hasImage("flight-icon")) {
        map.loadImage("/flight.png", (err, image) => {
          if (!err && image) map.addImage("flight-icon", image);
        });
      }

      const line = turf.lineString([ORIGIN, destinationGeo]);
      const lineDistance = turf.length(line, { units: "kilometers" });

      if (!map.getSource("flight-route")) {
        map.addSource("flight-route", {
          type: "geojson",
          data: line as Feature<LineString>,
        });
      }
      if (!map.getLayer("flight-route-line")) {
        map.addLayer({
          id: "flight-route-line",
          type: "line",
          source: "flight-route",
          paint: { "line-color": "#ffffff", "line-width": 5 },
        });
      }

      const planeFeature: Feature<Point> = {
        type: "Feature",
        geometry: { type: "Point", coordinates: ORIGIN },
        properties: { bearing: 0 },
      };

      if (!map.getSource("plane")) {
        map.addSource("plane", { type: "geojson", data: planeFeature });
      }
      if (!map.getLayer("plane-layer")) {
        map.addLayer({
          id: "plane-layer",
          type: "symbol",
          source: "plane",
          layout: {
            "icon-image": "flight-icon",
            "icon-size": [
              "interpolate",
              ["linear"],
              ["zoom"],
              3,
              0.25,
              7,
              0.15,
              12,
              0.08,
              15,
              0.05,
            ],
            "icon-rotate": ["get", "bearing"],
            "icon-rotation-alignment": "map",
            "icon-pitch-alignment": "map",
            "icon-allow-overlap": true,
          },
        });
      }

      if (!isResume) {
        map.flyTo({ center: ORIGIN, zoom: 13, duration: 800 });
      }

      const animatePlane = () => {
        if (!isFlyingRef.current) return;

        const elapsed =
          accumulatedMinutes +
          (Date.now() - new Date(String(startedAt)).getTime()) / (1000 * 60);

        const progress = Math.min(elapsed / Number(estimatedMinutes), 1);
        const distance = lineDistance * progress;

        const currentPoint = turf.along(line, distance, {
          units: "kilometers",
        });
        const nextPoint = turf.along(
          line,
          Math.min(distance + 0.05, lineDistance),
          { units: "kilometers" },
        );
        const bearing = turf.bearing(currentPoint, nextPoint);

        planeFeature.geometry.coordinates = currentPoint.geometry.coordinates;
        planeFeature.properties!.bearing = bearing;

        (map.getSource("plane") as mapboxgl.GeoJSONSource).setData(
          planeFeature,
        );
        map.easeTo({
          center: currentPoint.geometry.coordinates as [number, number],
          bearing,
          pitch: map.getPitch(),
          duration: 300,
          easing: (t) => t,
        });

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animatePlane);
        }
      };

      if (isResume) {
        isFlyingRef.current = true;
        animatePlane();
      } else {
        setTimeout(() => animatePlane(), 850);
      }
    };

    if (map.isStyleLoaded()) {
      startFlight();
    } else {
      map.once("load", startFlight);
    }
  }, [isFlying, isPaused, destination, startedAt, estimatedMinutes]);

  return (
    <div className="w-full h-screen">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
