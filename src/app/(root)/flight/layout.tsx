import { ReactNode } from "react";

export default function FlightLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css"
        rel="stylesheet"
        media="print"
        // @ts-ignore
        onLoad="this.media='all'"
      />
      {children}
    </>
  );
}