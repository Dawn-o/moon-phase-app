import Header from "@/components/header";
import Hero from "@/components/hero";
import MoonTracker from "@/components/moon-tracker";
import MoonPhasesGrid from "@/components/moon-phases-grid";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 pointer-events-none scanlines opacity-20 z-50"></div>

      <Header />
      <Hero />

      <main className="flex-1">
        <section className="container mx-auto max-w-6xl px-4 py-8 sm:py-12">
          <div className="border-2 sm:border-4 border-border p-6 sm:p-8 md:p-10 bg-card shadow-[0_0_30px_hsl(var(--border)/0.3)] hover:shadow-[0_0_50px_hsl(var(--border)/0.5)] transition-shadow duration-500">
            <MoonTracker />
          </div>
        </section>

        <MoonPhasesGrid />
      </main>

      <Footer />
    </div>
  );
}
