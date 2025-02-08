import UserProfileCard from "@/components/ProfileCard";
import RewardsCarousel from "@/components/RewardsCarousel";
import { getRewards } from "@/services/reward";
import { getProfile } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();

  const { data: profile, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 10 * 1000,
  });

  const { data: rewardsData, isPending: rewardsPending } = useQuery({
    queryKey: ["rewards"],
    queryFn: getRewards,
    staleTime: 10 * 1000,
  });

  const handleRewardClick = (reward: any) => {
    navigate(`/reward/${reward.id}`);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 pt-[100px]">
      <div className="w-full max-w-6xl mx-auto">
        <UserProfileCard user={profile!} isLoading={isPending} />
        <div className="mt-10">
          <RewardsCarousel
            rewards={rewardsData!}
            title="Featured Rewards"
            onRewardClick={handleRewardClick}
            isLoading={rewardsPending}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
