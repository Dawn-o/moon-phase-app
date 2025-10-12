import MoonPhaseIcon from "./moon-phase-icon";

const phases = [
  { name: "NEW MOON", phase: 0 },
  { name: "WAXING CRESCENT", phase: 0.125 },
  { name: "FIRST QUARTER", phase: 0.25 },
  { name: "WAXING GIBBOUS", phase: 0.375 },
  { name: "FULL MOON", phase: 0.5 },
  { name: "WANING GIBBOUS", phase: 0.625 },
  { name: "LAST QUARTER", phase: 0.75 },
  { name: "WANING CRESCENT", phase: 0.875 },
];

export default function MoonPhasesGrid() {
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
          {phases.map((phaseData, i) => (
            <div
              key={i}
              className="group border-2 border-border p-3 sm:p-4 bg-background hover:bg-accent hover:border-foreground transition-all duration-300 cursor-pointer hover:scale-105"
            >
              <div className="mb-3 sm:mb-4 relative">
                <MoonPhaseIcon
                  phase={phaseData.phase}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 rounded-full transition-colors"></div>
              </div>
              <p className="text-center text-[9px] sm:text-xs text-foreground font-[family-name:var(--font-space-mono)] leading-tight">
                {phaseData.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
