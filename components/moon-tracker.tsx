"use client";

import { useEffect, useState } from "react";
import {
  getMoonPhase,
  getDaysUntil,
  type MoonPhaseData,
} from "@/lib/moon-phase";
import { useGeolocation } from "@/hooks/use-geolocation";
import MoonPhaseIcon from "./moon-phase-icon";

export default function MoonTracker() {
  const [moonData, setMoonData] = useState<MoonPhaseData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useGeolocation();

  useEffect(() => {
    setMoonData(getMoonPhase());

    const moonInterval = setInterval(() => {
      setMoonData(getMoonPhase());
    }, 60000);

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(moonInterval);
      clearInterval(timeInterval);
    };
  }, []);

  if (!moonData) {
    return (
      <div className="text-center p-8">
        <div className="inline-block border-2 border-border bg-background p-4 animate-pulse">
          <p className="text-muted-foreground font-[family-name:var(--font-space-mono)] text-sm">
            [LOADING LUNAR DATA...]
          </p>
        </div>
      </div>
    );
  }

  const daysToFullMoon = getDaysUntil(moonData.nextFullMoon);

  return (
    <>
      {!location.loading && (
        <div className="mb-6 sm:mb-8 border-4 border-border p-4 sm:p-5 bg-background retro-shadow">
          <div className="border-b-2 border-border pb-2 mb-4">
            <p className="text-foreground font-[family-name:var(--font-vt323)] text-lg sm:text-xl">
              [OBSERVER_LOCATION]
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-[family-name:var(--font-space-mono)]">
            <div className="border-2 border-border p-3 bg-card">
              <span className="text-muted-foreground text-xs block mb-1">
                LOCATION:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base">
                {location.error ? "UNKNOWN" : location.country}
              </span>
            </div>
            <div className="border-2 border-border p-3 bg-card">
              <span className="text-muted-foreground text-xs block mb-1">
                LATITUDE:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base tabular-nums">
                {location.error ? "N/A" : location.latitude.toFixed(4)}°
              </span>
            </div>
            <div className="border-2 border-border p-3 bg-card">
              <span className="text-muted-foreground text-xs block mb-1">
                LONGITUDE:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base tabular-nums">
                {location.error ? "N/A" : location.longitude.toFixed(4)}°
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-md mx-auto mb-8 sm:mb-10">
        <div className="border-4 border-border p-6 bg-background retro-shadow">
          <MoonPhaseIcon phase={moonData.phase} className="w-full h-auto" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-foreground font-[family-name:var(--font-vt323)] text-5xl sm:text-7xl md:text-8xl neon-glow">
              {Math.round(moonData.illumination)}%
            </div>
          </div>
        </div>
      </div>

      <div className="border-4 border-border bg-background p-5 sm:p-7 retro-shadow">
        <div className="border-b-2 border-border pb-3 mb-5">
          <p className="text-foreground font-[family-name:var(--font-vt323)] text-xl sm:text-2xl">
            [LUNAR_DATA_OUTPUT]
          </p>
        </div>
        <div className="space-y-4 font-[family-name:var(--font-space-mono)]">
          <div className="border-2 border-border p-3 bg-card hover:bg-accent transition-colors">
            <div className="flex justify-between items-center gap-4">
              <span className="text-muted-foreground text-xs sm:text-sm">
                &gt; CURRENT_PHASE:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base">
                {moonData.phaseName}
              </span>
            </div>
          </div>
          <div className="border-2 border-border p-3 bg-card hover:bg-accent transition-colors">
            <div className="flex justify-between items-center gap-4">
              <span className="text-muted-foreground text-xs sm:text-sm">
                &gt; ILLUMINATION:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base">
                {moonData.illumination}%
              </span>
            </div>
          </div>
          <div className="border-2 border-border p-3 bg-card hover:bg-accent transition-colors">
            <div className="flex justify-between items-center gap-4">
              <span className="text-muted-foreground text-xs sm:text-sm">
                &gt; MOON_AGE:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base">
                {moonData.age} {moonData.age === 1 ? "DAY" : "DAYS"}
              </span>
            </div>
          </div>
          <div className="border-2 border-border p-3 bg-card hover:bg-accent transition-colors">
            <div className="flex justify-between items-center gap-4">
              <span className="text-muted-foreground text-xs sm:text-sm">
                &gt; NEXT_FULL_MOON:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base">
                {daysToFullMoon} {daysToFullMoon === 1 ? "DAY" : "DAYS"}
              </span>
            </div>
          </div>
          <div className="border-2 border-border p-3 bg-card hover:bg-accent transition-colors">
            <div className="flex justify-between items-center gap-4">
              <span className="text-muted-foreground text-xs sm:text-sm">
                &gt; TIMESTAMP:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base tabular-nums">
                {currentTime
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })
                  .replace(/\//g, ".")
                  .replace(", ", " ")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <div className="border-4 border-border p-4 bg-background retro-shadow">
          <p className="text-muted-foreground mb-3 font-[family-name:var(--font-vt323)] text-lg sm:text-xl">
            [LUNAR_CYCLE_PROGRESS]
          </p>
          <div className="border-4 border-border p-2 bg-card">
            <div
              className="h-6 sm:h-8 bg-foreground pulse-glow transition-all duration-1000 relative overflow-hidden"
              style={{ width: `${moonData.illumination}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" />
            </div>
          </div>
          <div className="mt-2 flex justify-between font-[family-name:var(--font-space-mono)] text-xs text-muted-foreground">
            <span>0%</span>
            <span>{moonData.illumination}%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </>
  );
}
