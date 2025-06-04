import { HeroImage, HeroSection } from "./partials";
export default function Home() {
  return (
    <div className="flex flex-col sm:flex-row h-[90dvh] p-4">
      <div className="w-full h-full sm:w-1/2 flex items-center justify-center">
        <HeroImage />
      </div>

      <div className="w-full h-full sm:w-1/2 flex items-center justify-center p-2">
        <HeroSection />
      </div>
    </div>
  );
}
