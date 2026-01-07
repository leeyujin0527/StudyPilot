"use client";

import { useEffect } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function StarBackground() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0"
      options={{
        background: {
          color: "#000000",
        },
        particles: {
          number: {
            value: 100,
            density: { enable: true },
          },
          color: {
            value: ["#ffffff", "#7aaeff", "#FFC0CB"],
          },
          opacity: {
            value: 0.6,
          },
          size: {
            value: { min: 1, max: 3 },
          },
          move: {
            enable: true,
            speed: 0.2,
            direction: "none",
            outModes: "out",
          },
        },
      }}
    />
  );
}
