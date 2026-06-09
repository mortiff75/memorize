import Hero from "../components/Hero";
import LogoMarquee from "../components/Logo";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <LogoMarquee />
    </div>
  );
}
