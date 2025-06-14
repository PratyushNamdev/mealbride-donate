"use client";

import { useEffect, useState } from "react";
import { AddressFormDialog } from "@molecules";
import { toast } from "sonner";

export default function AddressChecker({
  address,
}: {
  address: string | null | undefined;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!address) {
      toast("Almost Done", {
        description:
          "Kindly provide your address to help collectors reach you for the pickup.",
      });
      setOpen(true);
    }
  }, [address]);

  return (
    <AddressFormDialog open={open} setOpen={setOpen} showContactField={true} />
  );
}
