import SunCalc from "suncalc";

export interface MoonPhaseData {
  phase: number;
  phaseName: string;
  illumination: number;
  nextFullMoon: Date;
  nextNewMoon: Date;
  age: number;
  phaseAngle: number;
  parallacticAngle: number;
}

export function getMoonPhase(date: Date = new Date()): MoonPhaseData {
  const moonIllumination = SunCalc.getMoonIllumination(date);
  const phase = moonIllumination.phase;
  const illumination = Math.round(moonIllumination.fraction * 100);

  const age = phase * 29.53;
  const phaseName = getPhaseName(phase);

  const nextFullMoon = findNextPhase(date, 0.5);
  const nextNewMoon = findNextPhase(date, 0);

  return {
    phase,
    phaseName,
    illumination,
    nextFullMoon,
    nextNewMoon,
    age: Math.round(age),
    phaseAngle: moonIllumination.angle,
    parallacticAngle: moonIllumination.angle,
  };
}

export function getMoonTimes(date: Date, latitude: number, longitude: number) {
  const moonTimes = SunCalc.getMoonTimes(date, latitude, longitude);
  const moonPosition = SunCalc.getMoonPosition(date, latitude, longitude);

  return {
    rise: moonTimes.rise,
    set: moonTimes.set,
    altitude: moonPosition.altitude,
    azimuth: moonPosition.azimuth,
    distance: moonPosition.distance,
  };
}

export function getNextPhaseDate(
  targetPhase: number,
  startDate: Date = new Date()
): Date {
  let date = new Date(startDate);
  const tolerance = 0.03;

  for (let i = 0; i < 60; i++) {
    date.setDate(date.getDate() + 1);
    const moonData = SunCalc.getMoonIllumination(date);

    let currentPhase = moonData.phase;
    let target = targetPhase;

    if (target === 0) {
      if (currentPhase < tolerance || currentPhase > 1 - tolerance) {
        return date;
      }
    } else {
      if (Math.abs(currentPhase - target) < tolerance) {
        return date;
      }
    }
  }

  return date;
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
  return getNextPhaseDate(targetPhase, startDate);
}

export function getDaysUntil(targetDate: Date): number {
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
