import RewardsCarousel from "@/components/RewardsCarousel";
import { getRewards } from "@/services/reward";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();

  const { data: rewardsData, isPending: rewardsPending } = useQuery({
    queryKey: ["rewards"],
    queryFn: getRewards,
    staleTime: 5 * 60 * 1000,
  });

  const handleRewardClick = (reward: any) => {
    navigate(`/reward/${reward.id}`);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 pt-[100px]">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl sm:text-2xl font-bold  px-4 sm:px-0">
            Rewards
          </h2>
          <Link
            to="/reward"
            className="flex items-center space-x-2 px-2 py-2 text-sm sm:text-base mr-4 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 ml-auto"
          >
            <span>See more</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <RewardsCarousel
          rewards={rewardsData!}
          onRewardClick={handleRewardClick}
          isLoading={rewardsPending}
        />
      </div>
    </div>
  );
}

export default HomePage;
