import { Card, CardContent, CardHeader, CardTitle } from "@ui";
import { MapPin } from "lucide-react";

interface mealAddress {
  city: string;
  state: string;
  country: string;
  address: string;
  postalCode: number;
}
export default function MealAddress({
  mealAddress,
}: {
  mealAddress: mealAddress;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Address</div>
          <div className="font-medium">{mealAddress.address}</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500">City</div>
            <div className="font-medium">{mealAddress.city}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">State</div>
            <div className="font-medium">{mealAddress.state}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Country</div>
            <div className="font-medium">{mealAddress.country}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500">Postal Code</div>
            <div className="font-medium">{mealAddress.postalCode}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
