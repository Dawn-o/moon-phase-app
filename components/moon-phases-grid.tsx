"use client";

import { useEffect, useState } from "react";
import MoonPhaseIcon from "./moon-phase-icon";
import { getNextPhaseDate } from "@/lib/moon-phase";

const phases = [
  { name: "NEW MOON", phase: 0, target: 0 },
  { name: "WAXING CRESCENT", phase: 0.125, target: 0.125 },
  { name: "FIRST QUARTER", phase: 0.25, target: 0.25 },
  { name: "WAXING GIBBOUS", phase: 0.375, target: 0.375 },
  { name: "FULL MOON", phase: 0.5, target: 0.5 },
  { name: "WANING GIBBOUS", phase: 0.625, target: 0.625 },
  { name: "LAST QUARTER", phase: 0.75, target: 0.75 },
  { name: "WANING CRESCENT", phase: 0.875, target: 0.875 },
];

export default function MoonPhasesGrid() {
  const [phasesDates, setPhasesDates] = useState<Record<number, Date>>({});
  const [sortedPhases, setSortedPhases] = useState(phases);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculateDates = () => {
      const dates: Record<number, Date> = {};
      phases.forEach((phase) => {
        dates[phase.target] = getNextPhaseDate(phase.target);
      });
      setPhasesDates(dates);

      // Sort phases by date
      const sorted = [...phases].sort((a, b) => {
        const dateA = dates[a.target];
        const dateB = dates[b.target];
        return dateA.getTime() - dateB.getTime();
      });
      setSortedPhases(sorted);
      setLoading(false);
    };

    calculateDates();
  }, []);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleDateString("en-US", { month: "long" });
    return `${day} ${month}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <section className="container mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <div className="border-2 sm:border-4 border-border p-6 sm:p-8 md:p-10 bg-card shadow-[0_0_30px_hsl(var(--border)/0.3)]">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block border-2 border-border px-6 py-3 bg-background mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-orbitron)] text-foreground tracking-[0.2em]">
              LUNAR CYCLE PHASES
            </h2>
          </div>
          <p className="text-muted-foreground font-[family-name:var(--font-space-mono)] text-xs sm:text-sm">
            [ 8 PHASES | 29.53 DAY CYCLE ]
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {sortedPhases.map((phaseData, i) => {
            const nextDate = phasesDates[phaseData.target];

            return (
              <div
                key={i}
                className="group border-2 border-border p-3 sm:p-4 bg-background hover:bg-accent hover:border-foreground transition-all duration-300 cursor-pointer hover:scale-105 flex flex-col"
              >
                <p className="text-center text-[8px] sm:text-xs text-foreground font-[family-name:var(--font-space-mono)] leading-tight mb-2 sm:mb-3 min-h-[2rem] flex items-center justify-center">
                  {phaseData.name}
                </p>

                <div className="mb-auto relative">
                  <MoonPhaseIcon
                    phase={phaseData.phase}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 rounded-full transition-colors"></div>
                </div>

                {!loading && nextDate && (
                  <div className="text-center mt-3 border-t border-border/30 pt-2 space-y-0.5">
                    <p className="text-[8px] sm:text-[10px] text-muted-foreground font-[family-name:var(--font-space-mono)]">
                      {formatDate(nextDate)}
                    </p>
                    <p className="text-[8px] sm:text-[10px] text-muted-foreground font-[family-name:var(--font-space-mono)] tabular-nums">
                      {formatTime(nextDate)}
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="text-center mt-3 border-t border-border/30 pt-2">
                    <p className="text-[8px] sm:text-[10px] text-muted-foreground/50 font-[family-name:var(--font-space-mono)]">
                      CALCULATING...
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}