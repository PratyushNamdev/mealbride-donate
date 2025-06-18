import { DonateNowButton } from "@atoms";

export default function DonationRequest() {
  return (
    <div className="max-w-md text-left">
      <h3 className="text-3xl font-bold text-[#005e38] mb-2">
        It seems you haven&apos;t successfully donated any meal yet.
      </h3>
      <p className="text-base text-gray-600">
        Not everyone is as fortunate as we are; every meal you share brings
        nourishment, hope, comfort, and dignity to someone who needs it most.
      </p>
      <p className="text-base text-gray-600 mb-4">
        Join us in making a difference and spreading kindness—together, we can
        create positive change and support those in need.
      </p>
      <DonateNowButton />
    </div>
  );
}
