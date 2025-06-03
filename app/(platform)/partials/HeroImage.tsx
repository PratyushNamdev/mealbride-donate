import Image from "next/image";

export default function HeroImage() {
  return (
    <Image
      width={700}
      height={700}
      alt="Food-Image"
      className="object-contain max-h-full"
      src="https://res.cloudinary.com/dgxvtemh2/image/upload/v1748913919/b0a8bedc-0619-42a7-a025-b3aa170cc657_cnefuq.png"
    />
  );
}
