import { HeroImage, HeroSection, ActiveDonationPreviewBanner } from "./partials";
export default function Home() {
  return (
    <div className="h-[90dvh]">
     <ActiveDonationPreviewBanner /> 
      <div className="flex flex-col sm:flex-row h-[85%] p-4">
        <div className="w-full h-full sm:w-1/2 flex items-center justify-center">
          <HeroImage />
        </div>
        <div className="w-full h-full sm:w-1/2 flex items-center justify-center p-2">
          <HeroSection />
        </div>
      </div>
    </div>
  );
}
