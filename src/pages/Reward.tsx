import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { getRewards, getRewardTypes, RewardItem } from "@/services/reward";
import Loader from "@/components/Loader";
import RewardCard from "@/components/RewardCard";

const RewardPage = () => {
  const [selectedType, setSelectedType] = useState("All");
  const navigate = useNavigate();

  const handleRewardClick = (reward: RewardItem) => {
    navigate(`/reward/${reward.id}`);
  };

  const { data: rewardsData, isPending: rewardsPending } = useQuery({
    queryKey: ["rewards"],
    queryFn: getRewards,
    staleTime: 5 * 60 * 1000,
  });

  const { data: rewardTypesData, isPending: rewardTypesPending } = useQuery({
    queryKey: ["rewardTypes"],
    queryFn: getRewardTypes,
    staleTime: 10 * 60 * 1000,
  });

  if (rewardsPending || rewardTypesPending) {
    return <Loader />;
  }

  const filteredRewards =
    selectedType === "All"
      ? rewardsData
      : rewardsData?.filter((r) => r.rewardType.id === selectedType);

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto p-4 pt-[100px]">
        {/* Header with Filter Dropdown */}
        <div className="flex justify-between items-center mb-4">
          <Breadcrumbs
            paths={[{ name: "Home", href: "/" }, { name: "Rewards" }]}
          />

          {/* Filter Dropdown (Aligned to the Right) */}
          <div className="w-48 sm:w-64">
            <Select onValueChange={setSelectedType} defaultValue="All">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Reward Type" />
              </SelectTrigger>
              <SelectContent>
                {[{ id: "All", name: "All" }, ...rewardTypesData!].map(
                  (type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-[20px] sm:mt-0 max-h-[75vh] overflow-auto">
          {filteredRewards?.map((reward) => (
            <RewardCard
              reward={reward}
              onRewardClick={handleRewardClick}
              key={reward.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardPage;
