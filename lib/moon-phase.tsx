import SunCalc from "suncalc";

export interface MoonPhaseData {
  phase: number; // 0-1 (0 = new moon, 0.5 = full moon)
  phaseName: string;
  illumination: number; // 0-100%
  nextFullMoon: Date;
  nextNewMoon: Date;
  age: number; // days since new moon
}

export function getMoonPhase(date: Date = new Date()): MoonPhaseData {
  const moonIllumination = SunCalc.getMoonIllumination(date);
  const phase = moonIllumination.phase;
  const illumination = Math.round(moonIllumination.fraction * 100);

  // Calculate moon age (days since new moon)
  const age = phase * 29.53;

  // Determine phase name
  const phaseName = getPhaseName(phase);

  // Find next full and new moon
  const nextFullMoon = findNextPhase(date, 0.5);
  const nextNewMoon = findNextPhase(date, 0);

  return {
    phase,
    phaseName,
    illumination,
    nextFullMoon,
    nextNewMoon,
    age: Math.round(age),
  };
}

function getPhaseName(phase: number): string {
  if (phase < 0.033 || phase > 0.967) return "NEW MOON";
  if (phase < 0.216) return "WAXING CRESCENT";
  if (phase < 0.283) return "FIRST QUARTER";
  if (phase < 0.466) return "WAXING GIBBOUS";
  if (phase < 0.533) return "FULL MOON";
  if (phase < 0.716) return "WANING GIBBOUS";
  if (phase < 0.783) return "LAST QUARTER";
  return "WANING CRESCENT";
}

function findNextPhase(startDate: Date, targetPhase: number): Date {
  let date = new Date(startDate);
  for (let i = 0; i < 60; i++) {
    date.setDate(date.getDate() + 1);
    const moonData = SunCalc.getMoonIllumination(date);
    if (targetPhase === 0.5) {
      if (moonData.phase >= 0.48 && moonData.phase <= 0.52) return date;
    } else {
      if (moonData.phase < 0.03 || moonData.phase > 0.97) return date;
    }
  }
  return date;
}

export function getDaysUntil(targetDate: Date): number {
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
