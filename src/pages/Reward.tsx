import { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { getRewards, getRewardTypes, RewardItem } from "@/services/reward";

const RewardPage = () => {
  const [selectedType, setSelectedType] = useState("All");
  const navigate = useNavigate();

  const handleRewardClick = (reward: RewardItem) => {
    navigate(`/reward/${reward.id}`);
  };

  const { data: rewardsData, isPending: rewardsPending } = useQuery({
    queryKey: ["rewards"],
    queryFn: getRewards,
    staleTime: 10 * 1000,
  });

  const { data: rewardTypesData, isPending: rewardTypesPending } = useQuery({
    queryKey: ["rewardTypes"],
    queryFn: getRewardTypes,
    staleTime: 10 * 1000,
  });

  if (rewardsPending || rewardTypesPending) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  const filteredRewards =
    selectedType === "All"
      ? rewardsData
      : rewardsData?.filter((r) => r.rewardType.id === selectedType);

  console.log(rewardsData);

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
            <Card
              key={reward.id}
              className="w-full flex flex-col h-full transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleRewardClick(reward)}
            >
              <CardHeader className="p-0">
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg">{reward.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {reward.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 gap-1 mt-auto">
                  <Calendar className="h-4 w-4" />
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
              <CardFooter className="p-4">
                <div className="w-full flex justify-between items-center">
                  <Badge className="text-xs">{reward.rewardType.name}</Badge>
                  <span className="text-lg font-bold text-blue-600">
                    {reward.point.toLocaleString()} points
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardPage;
