import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { RewardItem } from "@/services/reward";
import RewardTypeBadge from "./RewardTypeBadge";
import PointBadge from "./PointBadge";

interface RewardCardProps {
  reward: RewardItem;
  onRewardClick?: (reward: RewardItem) => void;
}

function RewardCard({ reward, onRewardClick }: RewardCardProps) {
  return (
    <Card
      key={reward.id}
      className="w-full flex flex-col h-full transition-transform duration-300 hover:scale-105 cursor-pointer"
      onClick={() => onRewardClick?.(reward)}
    >
      <CardHeader className="p-4">
        <img
          src={reward.image}
          alt={reward.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-3 sm:p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-base sm:text-lg line-clamp-1">
            {reward.name}
          </h3>
        </div>
        <div className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
          <p className="line-clamp-2">{reward.description}</p>
        </div>

        <div className="flex items-center text-xs sm:text-sm text-gray-500 gap-1 mt-auto">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>
            {format(new Date(reward.startDate), "MMM d")}
            {new Date(reward.startDate).getFullYear() !==
            new Date(reward.endDate).getFullYear()
              ? `, ${format(new Date(reward.startDate), "yyyy")}`
              : ""}{" "}
            - {format(new Date(reward.endDate), "MMM d, yyyy")}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0 mt-auto">
        <div className="w-full flex justify-between items-center">
          <RewardTypeBadge rewardType={reward.rewardType.name} />
          <PointBadge point={reward.point} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default RewardCard;
