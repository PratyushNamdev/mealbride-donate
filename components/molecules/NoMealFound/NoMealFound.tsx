import DonationRequest from "./partials/DonationRequest";
import NotFoundImage from "./partials/NotFoundImage";

export default function NoMealFound() {
  return (
    <div className="flex flex-col items-center justify-evenly md:flex-row md:min-h-[85vh]">
      <div className="w-full max-w-md flex items-center justify-center pt-10 ">
        <NotFoundImage />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <DonationRequest />
      </div>
    </div>
  );
}
