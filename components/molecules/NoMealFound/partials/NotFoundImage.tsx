import Image from "next/image";

export default function NotFoundImage() {
  return (
    <Image
      src="/assets/DonationNotFound.png"
      alt="No donations found"
      width={500}
      height={500}
      className="object-contain object-center"
    />
  );
}
