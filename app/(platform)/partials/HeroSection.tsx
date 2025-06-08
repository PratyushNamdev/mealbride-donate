import { DonateNowButton } from "@atoms";

export default function HeroSection() {
  return (
    <div className="max-w-md text-left">
      <h1 className="text-3xl font-bold text-[#005e38] mb-2">Be the Reason</h1>
      <h2 className="text-4xl font-semibold text-gray-800 mb-4">
        Someone smiles today!
      </h2>
      <p className="text-base text-gray-600 mb-6">
        Donating food not only reduces waste—it spreads kindness and makes a
        real difference. Let your extra meal be someone’s happiness.
      </p>
      <DonateNowButton />
    </div>
  );
}
