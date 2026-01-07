import { LngLat } from "./types";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const BASE_URL = "https://api.mapbox.com";

if (!MAPBOX_TOKEN) {
    throw new Error("MAPBOX_TOKEN is not defined");
}

export const getGeoCoding = async(city : string) : Promise<LngLat> => {
    const res = await fetch(
    `${BASE_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${MAPBOX_TOKEN}&limit=1&language=ko`
  );

  if (!res.ok) {
    throw new Error("Failed to geocode place");
  }

  const data = await res.json();

  if (!data.features || data.features.length === 0) {
    throw new Error(`No geocoding result for ${city}`);
  }

  return data.features[0].center;
}