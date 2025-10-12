import MoonTracker from "@/components/moon-tracker";
import MoonPhaseIcon from "@/components/moon-phase-icon";

export default function Home() {
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

  return (
    <main className="min-h-screen bg-background text-foreground font-mono">
      <div className="fixed inset-0 pointer-events-none scanlines opacity-30 z-50"></div>

      <header className="border-b-2 border-border p-3 sm:p-4 bg-background/50">
        <div className="container mx-auto max-w-6xl">
          <div className="border-2 border-border p-2 sm:p-3 bg-background">
            <p className="text-foreground font-[family-name:var(--font-vt323)] text-sm sm:text-lg md:text-xl">
              LUNAR TRACKING SYSTEM v1.0
            </p>
            <p className="text-muted-foreground font-[family-name:var(--font-space-mono)] text-xs sm:text-sm">
              STATUS: OPERATIONAL
            </p>
          </div>
        </div>
      </header>

      <section className="container mx-auto max-w-6xl px-4 py-6 sm:py-10">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="inline-block border-4 border-double border-border p-4 sm:p-6 md:p-8 bg-card">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-[family-name:var(--font-orbitron)] tracking-tight sm:tracking-wide md:tracking-[0.3em] text-foreground">
              MOON.TODAY
            </h1>
          </div>
          <p className="text-muted-foreground font-[family-name:var(--font-vt323)] text-lg sm:text-2xl md:text-3xl">
            CELESTIAL NAVIGATION PROTOCOL
          </p>
          <p className="text-muted-foreground/70 font-[family-name:var(--font-space-mono)] text-xs sm:text-sm">
            INITIALIZED: 2025 | MODE: TERMINAL
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-6 sm:py-12">
        <div className="border-2 sm:border-4 border-border p-4 sm:p-6 md:p-8 bg-card">
          <MoonTracker />
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-6 sm:py-12">
        <div className="border-2 sm:border-4 border-border p-4 sm:p-6 md:p-8 bg-card">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-orbitron)] text-center mb-6 sm:mb-8 text-foreground tracking-wider">
            LUNAR CYCLE PHASES
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {phases.map((phaseData, i) => (
              <div
                key={i}
                className="border-2 border-border p-3 sm:p-4 bg-background hover:bg-accent transition-colors cursor-pointer"
              >
                <MoonPhaseIcon
                  phase={phaseData.phase}
                  className="w-full h-auto mb-2 sm:mb-3"
                />
                <p className="text-center text-[10px] sm:text-xs text-foreground font-[family-name:var(--font-space-mono)] leading-tight">
                  {phaseData.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-border p-4 sm:p-6 mt-8 sm:mt-12 bg-background/50">
        <p className="text-center text-muted-foreground font-[family-name:var(--font-vt323)] text-lg sm:text-2xl">
          SYSTEM READY FOR INPUT _
        </p>
      </footer>
    </main>
  );
}
