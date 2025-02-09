import { Link, useParams } from "react-router"; // for route params
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // your Card components
import { format } from "date-fns";
import { Calendar, Loader2 } from "lucide-react"; // Icon for date
import { Button } from "@/components/ui/button"; // Assuming you're using your button component
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReward, postExchangeReward } from "@/services/reward";
import Loader from "@/components/Loader";
import { useProfile } from "@/hooks/useProfile";
import RewardTypeBadge from "@/components/RewardTypeBadge";
import PointBadge from "@/components/PointBadge";

const NotFoundRewardPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Reward Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, the reward you're looking for does not exist.
        </p>
        <Link
          to="/reward"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
        >
          Go Back to Rewards List
        </Link>
      </div>
    </div>
  );
};

const RewardDetailPage = () => {
  // Get the reward ID from the URL params
  const { rewardId } = useParams<{ rewardId: string }>();
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isExchanged, setIsExchanged] = useState(false);

  const queryClient = useQueryClient();

  // fetch reward data
  const { data: reward, isPending } = useQuery({
    queryKey: ["reward", rewardId],
    queryFn: () => getReward(rewardId!),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  // fetch point data
  const { data: profile, isPending: profilePending } = useProfile();

  const mutation = useMutation({
    mutationFn: postExchangeReward,
    onSuccess: () => {
      handleCloseExchangeModal();
      setIsExchanged(true);
      queryClient.invalidateQueries({ queryKey: ["reward", rewardId] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleCloseExchangeModal = () => {
    setIsExchangeModalOpen(false);
  };

  useEffect(() => {
    if (reward) {
      setIsExchanged(reward.isExchanged); // Set the isExchanged state from reward data
    }
  }, [reward]);

  if (isPending || profilePending) {
    return <Loader />;
  }

  if (!reward) {
    return <NotFoundRewardPage />;
  }

  const canExchange = !isExchanged && profile!.point >= reward.point;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-[100px]">
      <Breadcrumbs
        className="mb-6 mt-2"
        paths={[
          { name: "Home", href: "/" },
          { name: "Rewards", href: "/reward" },
          { name: reward.name },
        ]}
      />
      <Card className="transition-transform duration-300">
        <CardHeader className="p-4">
          <img
            src={reward.image}
            alt={reward.name}
            className="w-full h-60 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="p-4">
          <h1 className="text-3xl font-bold">{reward.name}</h1>
          <p className="text-gray-600 text-sm mb-4 mt-2">
            {reward.description}
          </p>
          <div className="flex items-center text-sm text-gray-500 gap-1 mt-4">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(reward.startDate), "MMM d, yyyy")} -
              {" " + format(new Date(reward.endDate), "MMM d, yyyy")}
            </span>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Conditions</h3>
            <p className="text-sm text-gray-600 mt-2">{reward.conditions}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center">
          <RewardTypeBadge rewardType={reward.rewardType.name} />
          <PointBadge point={reward.point} />
        </CardFooter>
        <div className="px-4 pb-4">
          <Button
            variant="default"
            onClick={() => setIsExchangeModalOpen(true)}
            className="w-full transition-all duration-200"
            disabled={!canExchange}
          >
            {isExchanged
              ? "Exchanged"
              : profile!.point < reward.point
              ? "Insufficient Points"
              : "Exchange Now"}
          </Button>
        </div>
      </Card>

      <Dialog open={isExchangeModalOpen} onOpenChange={setIsExchangeModalOpen}>
        <DialogContent className="max-w-md sm:max-w-lg rounded-md">
          <DialogHeader>
            <h2 className="text-lg font-semibold">Confirm Exchange</h2>
          </DialogHeader>
          <p className="text-gray-600">
            Are you sure you want to exchange your points?
          </p>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsExchangeModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => mutation.mutate(reward.id)}
              disabled={mutation.isPending}
            >
              {mutation.isPending && <Loader2 className="animate-spin" />}{" "}
              Confirm Exchange
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RewardDetailPage;
