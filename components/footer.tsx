import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-border p-6 sm:p-8 mt-12 sm:mt-16 bg-background/95 backdrop-blur">
      <div className="container mx-auto max-w-6xl">
        <div className="border-2 border-border p-4 sm:p-6 bg-card">
          <p className="text-center text-muted-foreground font-[family-name:var(--font-vt323)] text-xl sm:text-3xl">
            &gt; END OF TRANSMISSION<span className="blink">_</span>
          </p>
          <p className="text-center text-muted-foreground/50 font-[family-name:var(--font-space-mono)] text-[10px] sm:text-xs mt-2">
            <Link
              href="https://github.com/rushelasli"
              className="underline hover:text-foreground/60 transition-colors"
            >
              MOON.TODAY
            </Link>
            &copy; 2025 | ALL SYSTEMS NOMINAL
          </p>
        </div>
      </div>
    </footer>
  );
}
