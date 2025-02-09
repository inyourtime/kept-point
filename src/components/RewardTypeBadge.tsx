import { Badge } from "@/components/ui/badge";
import { rewardTypeColors } from "@/constants/reward";

function RewardTypeBadge({ rewardType }: { rewardType: string }) {
  return (
    <Badge
      className={`text-xs ${
        rewardTypeColors[rewardType] || rewardTypeColors["Default"]
      }`}
    >
      {rewardType}
    </Badge>
  );
}

export default RewardTypeBadge;
