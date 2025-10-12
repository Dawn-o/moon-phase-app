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
      <div className="text-center text-muted-foreground font-[family-name:var(--font-space-mono)]">
        LOADING LUNAR DATA...
      </div>
    );
  }

  const daysToFullMoon = getDaysUntil(moonData.nextFullMoon);

  return (
    <>
      {!location.loading && (
        <div className="mb-6 sm:mb-8 border-2 border-border p-3 sm:p-4 bg-background">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 font-[family-name:var(--font-space-mono)]">
            <div className="text-center sm:text-left">
              <span className="text-muted-foreground text-xs sm:text-sm block">
                LOCATION:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base">
                {location.error
                  ? "UNKNOWN"
                  : `${location.city}, ${location.country}`}
              </span>
            </div>
            <div className="text-center">
              <span className="text-muted-foreground text-xs sm:text-sm block">
                LATITUDE:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base">
                {location.error ? "N/A" : location.latitude.toFixed(4)}°
              </span>
            </div>
            <div className="text-center sm:text-right">
              <span className="text-muted-foreground text-xs sm:text-sm block">
                LONGITUDE:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base">
                {location.error ? "N/A" : location.longitude.toFixed(4)}°
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-sm mx-auto mb-6 sm:mb-8">
        <MoonPhaseIcon phase={moonData.phase} className="w-full h-auto" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-foreground font-[family-name:var(--font-vt323)] text-4xl sm:text-6xl md:text-7xl opacity-80 mix-blend-difference">
            {Math.round(moonData.illumination)}%
          </div>
        </div>
      </div>

      <div className="border-2 border-border bg-background p-4 sm:p-6 font-[family-name:var(--font-space-mono)]">
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 border-b border-border/50 pb-3">
            <span className="text-muted-foreground text-xs sm:text-sm">
              CURRENT PHASE:
            </span>
            <span className="text-foreground font-bold text-sm sm:text-base">
              {moonData.phaseName}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 border-b border-border/50 pb-3">
            <span className="text-muted-foreground text-xs sm:text-sm">
              ILLUMINATION:
            </span>
            <span className="text-foreground font-bold text-sm sm:text-base">
              {moonData.illumination}%
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 border-b border-border/50 pb-3">
            <span className="text-muted-foreground text-xs sm:text-sm">
              MOON AGE:
            </span>
            <span className="text-foreground font-bold text-sm sm:text-base">
              {moonData.age} {moonData.age === 1 ? "DAY" : "DAYS"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 border-b border-border/50 pb-3">
            <span className="text-muted-foreground text-xs sm:text-sm">
              NEXT FULL MOON:
            </span>
            <span className="text-foreground font-bold text-sm sm:text-base">
              {daysToFullMoon} {daysToFullMoon === 1 ? "DAY" : "DAYS"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <span className="text-muted-foreground text-xs sm:text-sm">
              TIMESTAMP:
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

      <div className="mt-6 sm:mt-8">
        <p className="text-muted-foreground mb-2 font-[family-name:var(--font-space-mono)] text-xs sm:text-sm">
          LUNAR CYCLE PROGRESS
        </p>
        <div className="border-2 border-border p-1 bg-background">
          <div
            className="h-4 sm:h-6 bg-foreground shadow-[0_0_20px_hsl(var(--foreground)/0.5)] transition-all duration-1000"
            style={{ width: `${moonData.illumination}%` }}
          ></div>
        </div>
      </div>
    </>
  );
}
