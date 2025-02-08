import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";

interface UserProfileProps {
  user: {
    name: string | null;
    email: string;
    point: number;
  };
  isLoading: boolean;
}

const UserProfileCardSkeleton = () => {
  return (
    <Card className="w-full bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />{" "}
      {/* Skeleton for avatar/icon */}
      <div className="flex-grow">
        <Skeleton className="h-6 w-32" /> {/* Skeleton for name/email */}
      </div>
      <div className="ml-auto flex items-center">
        <Skeleton className="h-6 w-16" /> {/* Skeleton for points */}
      </div>
    </Card>
  );
};

const UserProfileCard = ({ user, isLoading }: UserProfileProps) => {
  if (isLoading) {
    return <UserProfileCardSkeleton />;
  }

  return (
    <Card className="w-full bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 transition duration-300 ease-in-out hover:scale-105">
      <User className="h-6 w-6 text-gray-600" />
      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{user.name || user.email}</h2>
      </div>
      <div className="ml-auto">
        <span className="text-gray-700 mr-2">Points:</span>
        <span className="font-bold text-blue-500 text-lg">{user.point}</span>
      </div>
    </Card>
  );
};

export default UserProfileCard;
