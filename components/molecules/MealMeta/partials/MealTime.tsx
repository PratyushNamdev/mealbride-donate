import { Card, CardContent, CardHeader, CardTitle, Separator } from "@ui";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface mealTime {
  preferredTime: string;
  deliveryDate: string | null;
  expiryDate: string;
}
export default function MealTime({ mealTime }: { mealTime: mealTime }) {
  const isActive = Date.now() < new Date(mealTime.expiryDate).getTime();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-700 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Timing Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="text-sm text-gray-500">Preferred Pickup Time</div>
              <div className="font-medium">
                {format(new Date(mealTime.preferredTime), "MMM dd, yyyy")}
              </div>
              <div className="text-sm text-gray-600">
                {format(new Date(mealTime.preferredTime), "h:mm a")}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="text-sm text-gray-500">
                {isActive ? "Expires On" : "Expired On"}
              </div>
              <div className="font-medium">
                {format(new Date(mealTime.expiryDate), "MMM dd, yyyy")}
              </div>
              <div className="text-sm text-gray-600">
                {format(new Date(mealTime.expiryDate), "h:mm a")}
              </div>
            </div>
          </div>

          {mealTime.deliveryDate && (
            <>
              <Separator />
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Delivery Date</div>
                <div className="font-medium">
                  {format(
                    new Date(mealTime.deliveryDate),
                    "MMM dd, yyyy h:mm a"
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
