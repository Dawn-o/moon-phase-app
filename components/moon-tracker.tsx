"use client";

import { useEffect, useState } from "react";
import {
  getMoonPhase,
  getDaysUntil,
  type MoonPhaseData,
} from "@/lib/moon-phase";
import MoonPhaseIcon from "./moon-phase-icon";
import { ChevronsUp, ChevronsDown } from "lucide-react";

export default function MoonTracker() {
  const [moonData, setMoonData] = useState<MoonPhaseData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMore, setShowMore] = useState(false);

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
  const daysToNewMoon = getDaysUntil(moonData.nextNewMoon);

  return (
    <>
      <div className="border-4 border-border bg-background p-5 sm:p-6 retro-shadow mb-6 sm:mb-8">
        <div className="border-b-2 border-border pb-3 mb-5">
          <p className="text-foreground font-[family-name:var(--font-vt323)] text-xl sm:text-2xl">
            [CRITICAL_LUNAR_STATUS]
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border-2 border-border p-4 bg-card">
            <p className="text-muted-foreground text-xs sm:text-sm mb-2 font-[family-name:var(--font-space-mono)]">
              CURRENT PHASE
            </p>
            <p className="text-foreground font-bold text-lg sm:text-xl font-[family-name:var(--font-vt323)]">
              {moonData.phaseName}
            </p>
          </div>
          <div className="border-2 border-border p-4 bg-card">
            <p className="text-muted-foreground text-xs sm:text-sm mb-2 font-[family-name:var(--font-space-mono)]">
              ILLUMINATION
            </p>
            <p className="text-foreground font-bold text-lg sm:text-xl font-[family-name:var(--font-vt323)]">
              {moonData.illumination}%
            </p>
          </div>
        </div>
      </div>

      <div className="border-4 border-border p-6 bg-background retro-shadow mb-6 sm:mb-8">
        <div className="relative w-full max-w-md mx-auto">
          <MoonPhaseIcon phase={moonData.phase} className="w-full h-auto" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-foreground font-[family-name:var(--font-vt323)] text-5xl sm:text-7xl md:text-8xl neon-glow">
              {Math.round(moonData.illumination)}%
            </div>
          </div>
        </div>
      </div>

      <div className="border-4 border-border bg-background p-5 sm:p-7 retro-shadow mb-6 sm:mb-8">
        <div className="border-b-2 border-border pb-3 mb-5">
          <p className="text-foreground font-[family-name:var(--font-vt323)] text-xl sm:text-2xl">
            [PRIMARY_LUNAR_DATA]
          </p>
        </div>
        <div className="space-y-4 font-[family-name:var(--font-space-mono)]">
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
                &gt; NEXT_NEW_MOON:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base">
                {daysToNewMoon} {daysToNewMoon === 1 ? "DAY" : "DAYS"}
              </span>
            </div>
          </div>
          <div className="border-2 border-border p-3 bg-card hover:bg-accent transition-colors">
            <div className="flex justify-between items-center gap-4">
              <span className="text-muted-foreground text-xs sm:text-sm">
                &gt; PHASE_ANGLE:
              </span>
              <span className="text-foreground font-bold text-sm sm:text-base">
                {(moonData.phaseAngle * (180 / Math.PI)).toFixed(2)}°
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-4 border-border p-4 bg-background retro-shadow mb-6 sm:mb-8">
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

      <div className="mb-6 sm:mb-8">
        <button
          onClick={() => setShowMore(!showMore)}
          className="w-full border-4 border-border bg-background p-4 hover:bg-accent transition-colors font-[family-name:var(--font-vt323)] text-lg sm:text-xl text-foreground retro-shadow cursor-pointer"
        >
          {showMore ? (
            <>
              <ChevronsUp className="inline-block mr-2" size={20} />
              HIDE DETAILED DATA
            </>
          ) : (
            <>
              <ChevronsDown className="inline-block mr-2" size={20} />
              SHOW DETAILED DATA
            </>
          )}
        </button>
      </div>

      {showMore && (
        <div className="border-4 border-border bg-background p-5 sm:p-7 retro-shadow mb-6 sm:mb-8">
          <div className="border-b-2 border-border pb-3 mb-5">
            <p className="text-foreground font-[family-name:var(--font-vt323)] text-xl sm:text-2xl">
              [DETAILED_LUNAR_METRICS]
            </p>
          </div>
          <div className="space-y-4 font-[family-name:var(--font-space-mono)]">
            <div className="border-2 border-border p-3 bg-card hover:bg-accent transition-colors">
              <div className="flex justify-between items-center gap-4">
                <span className="text-muted-foreground text-xs sm:text-sm">
                  &gt; PARALLACTIC_ANGLE:
                </span>
                <span className="text-foreground font-bold text-sm sm:text-base">
                  {(moonData.parallacticAngle * (180 / Math.PI)).toFixed(2)}°
                </span>
              </div>
            </div>
            <div className="border-2 border-border p-3 bg-card hover:bg-accent transition-colors">
              <div className="flex justify-between items-center gap-4">
                <span className="text-muted-foreground text-xs sm:text-sm">
                  &gt; NEXT_FULL_MOON_DATE:
                </span>
                <span className="text-foreground font-bold text-sm sm:text-base tabular-nums">
                  {moonData.nextFullMoon
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\//g, ".")}
                </span>
              </div>
            </div>
            <div className="border-2 border-border p-3 bg-card hover:bg-accent transition-colors">
              <div className="flex justify-between items-center gap-4">
                <span className="text-muted-foreground text-xs sm:text-sm">
                  &gt; NEXT_NEW_MOON_DATE:
                </span>
                <span className="text-foreground font-bold text-sm sm:text-base tabular-nums">
                  {moonData.nextNewMoon
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\//g, ".")}
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
      )}
    </>
  );
}
