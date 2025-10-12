export default function Header() {
  return (
    <header className="border-b-2 border-border">
      <div className="container mx-auto max-w-6xl p-3 sm:p-4">
        <div className="flex items-center justify-between border-2 border-border p-3 sm:p-4 shadow-[0_0_20px_hsl(var(--border)/0.3)]">
          <div>
            <p className="text-foreground font-[family-name:var(--font-vt323)] text-base sm:text-xl md:text-2xl tracking-wide">
              MOON.TODAY SYSTEM v1.0
            </p>
            <p className="text-muted-foreground font-[family-name:var(--font-space-mono)] text-[10px] sm:text-xs mt-1">
              STATUS: <span className="text-foreground">OPERATIONAL</span>
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="w-3 h-3 rounded-full bg-foreground animate-pulse shadow-[0_0_10px_hsl(var(--foreground))]"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
