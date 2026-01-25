"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import { getGeoCoding } from "@/src/infrastructure/geo/geo";
import { useFlightStore } from "../../flight/model/flightStore";
import type { Feature, Point, LineString } from "geojson";

import "mapbox-gl/dist/mapbox-gl.css";

const ORIGIN: [number, number] = [127.0, 37.5];

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const animationRef = useRef<number | null>(null);
  const isFlyingRef = useRef<boolean>(false);

  const isFlying = useFlightStore((s) => s.isFlying);
  const destination = useFlightStore((s) => s.destination);
  const startedAt = useFlightStore((s) => s.startedAt);
  const estimatedMinutes = useFlightStore((s) => s.estimatedMinutes);

  /* =====================
     isFlying ref 동기화
  ===================== */
  useEffect(() => {
    isFlyingRef.current = isFlying;
  }, [isFlying]);

  /* =====================
     지도 생성 (1회)
  ===================== */
  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/yujineee/cmkfkf28900ml01svd8fu9126",
      center: ORIGIN,
      zoom: 7.3,
    });

    mapRef.current = map;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      map.remove();
    };
  }, []);

  /* =====================
     비행 시작 / 중단
  ===================== */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // =====================
    // ✈️ 비행 중단
    // =====================
    if (!isFlying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      if (map.getLayer("plane-layer")) map.removeLayer("plane-layer");
      if (map.getLayer("flight-route-line"))
        map.removeLayer("flight-route-line");

      if (map.getSource("plane")) map.removeSource("plane");
      if (map.getSource("flight-route"))
        map.removeSource("flight-route");

      document
        .querySelectorAll(".mapboxgl-marker")
        .forEach((m) => m.remove());

      map.easeTo({
        center: ORIGIN,
        zoom: 7.3,
        bearing: 0,
        pitch: 0,
        duration: 800,
      });

      return;
    }

    // =====================
    // ✈️ 비행 시작
    // =====================
    const startFlight = async () => {
      if (!destination) return;

      const destinationGeo = await getGeoCoding(String(destination));

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

      map.addSource("flight-route", {
        type: "geojson",
        data: line as Feature<LineString>,
      });

      map.addLayer({
        id: "flight-route-line",
        type: "line",
        source: "flight-route",
        paint: {
          "line-color": "#ffffff",
          "line-width": 3,
        },
      });

      const planeFeature: Feature<Point> = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: ORIGIN,
        },
        properties: { bearing: 0 },
      };

      map.addSource("plane", {
        type: "geojson",
        data: planeFeature,
      });

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
            3, 0.25,
            7, 0.15,
            12, 0.08,
            15, 0.05,
          ],
          "icon-rotate": ["get", "bearing"],
          "icon-rotation-alignment": "map",
          "icon-pitch-alignment": "map",
          "icon-allow-overlap": true,
        },
      });

      const animatePlane = () => {
        if (!isFlyingRef.current) return;

        const elapsed =
          (Date.now() - new Date(String(startedAt)).getTime()) /
          (1000 * 60);

        const progress = Math.min(
          elapsed / Number(estimatedMinutes),
          1
        );

        const distance = lineDistance * progress;

        const currentPoint = turf.along(line, distance, {
          units: "kilometers",
        });

        const nextPoint = turf.along(
          line,
          Math.min(distance + 0.05, lineDistance),
          { units: "kilometers" }
        );

        const bearing = turf.bearing(currentPoint, nextPoint);

        planeFeature.geometry.coordinates =
          currentPoint.geometry.coordinates;
        planeFeature.properties!.bearing = bearing;

        (
          map.getSource("plane") as mapboxgl.GeoJSONSource
        ).setData(planeFeature);

        map.easeTo({
          center: currentPoint.geometry.coordinates as [number, number],
          bearing,
          zoom: map.getZoom(),
          pitch: map.getPitch(),
          duration: 300,
          easing: (t) => t,
        });

        if (progress < 1) {
          animationRef.current =
            requestAnimationFrame(animatePlane);
        }
      };

      animatePlane();

      map.fitBounds([ORIGIN, destinationGeo], {
        padding: 120,
        duration: 1000,
      });
    };

    if (map.isStyleLoaded()) {
      startFlight();
    } else {
      map.once("load", startFlight);
    }
  }, [isFlying, destination, startedAt, estimatedMinutes]);

  return (
    <div className="w-full h-screen">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
