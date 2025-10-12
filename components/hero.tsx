export default function Hero() {
  return (
    <section className="container mx-auto max-w-6xl px-4 py-8 sm:py-16">
      <div className="text-center space-y-4 sm:space-y-6">
        <div className="relative inline-block">
          <div className="absolute inset-0 border-4 border-double border-border blur-sm opacity-50"></div>
          <div className="relative border-4 border-double border-border p-6 sm:p-8 md:p-12 bg-card shadow-[0_0_40px_hsl(var(--border)/0.4)]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-orbitron)] tracking-tight sm:tracking-wide md:tracking-[0.2em] text-foreground">
              MOON.TODAY
            </h1>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-muted-foreground font-[family-name:var(--font-vt323)] text-xl sm:text-3xl md:text-4xl tracking-wide">
            &gt;&gt; CELESTIAL NAVIGATION PROTOCOL &lt;&lt;
          </p>
          <p className="text-muted-foreground/60 font-[family-name:var(--font-space-mono)] text-xs sm:text-sm">
            [ INITIALIZED: 2025 ] [ MODE: TERMINAL ]
          </p>
        </div>
      </div>
    </section>
  );
}
