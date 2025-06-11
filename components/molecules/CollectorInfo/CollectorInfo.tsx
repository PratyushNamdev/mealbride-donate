import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, Star, Calendar } from "lucide-react";
import { format } from "date-fns";

interface CollectorInfoProps {
  collector: {
    username: string;
    profilePicture: string;
    collectionCount: number;
    email: string;
    createdAt: string;
  } | null;
}

export function CollectorInfo({ collector }: CollectorInfoProps) {
  // Debug: Log the profile picture URL
  console.log("Profile Picture URL:", collector?.profilePicture);
  console.log("Full collector data:", collector);

  // Helper function to get initials safely
  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2); // Limit to 2 characters
  };

  return (
    <Card className="my-2 bg-gradient-to-br from-green-50 to-cream-50 border-green-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-green-700 flex items-center gap-2">
          <User className="h-5 w-5" />
          Collector Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-green-200">
            <AvatarImage
              src={collector?.profilePicture || ""}
              alt={collector?.username || "Collector"}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              onError={(e) => {
                console.error(
                  "Image failed to load:",
                  collector?.profilePicture
                );
              }}
              onLoad={() => {
                console.log("Image loaded successfully");
              }}
            />
            <AvatarFallback className="bg-green-100 text-green-700 text-lg font-semibold">
              {collector?.username ? getInitials(collector.username) : "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-lg text-gray-900">
              {collector?.username || "Unknown"}
            </h3>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="border-cream-300 text-cream-700"
              >
                {collector?.collectionCount || 0} collections
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4 text-green-500" />
            <span>{collector?.email || "No email"}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 sm:col-span-2">
            <Calendar className="h-4 w-4 text-green-500" />
            <span>
              {collector?.createdAt
                ? `Member since ${format(
                    new Date(collector.createdAt),
                    "MMMM yyyy"
                  )}`
                : "Member since —"}
            </span>
          </div>
        </div>

        <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
          <User className="h-4 w-4 mr-2" />
          Visit Profile
        </Button>
      </CardContent>
    </Card>
  );
}
