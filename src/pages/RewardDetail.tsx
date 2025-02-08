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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReward, postExchangeReward } from "@/services/reward";
import { getProfile } from "@/services/user";

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

  const queryClient = useQueryClient();

  // fetch reward data
  const { data: reward, isPending } = useQuery({
    queryKey: ["reward", rewardId],
    queryFn: () => getReward(rewardId!),
    retry: false,
    staleTime: 10 * 1000,
  });

  // fetch point data
  const { data: profile, isPending: profilePending } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 1000,
  });

  const mutation = useMutation({
    mutationFn: postExchangeReward,
    onSuccess: () => {
      handleCloseExchangeModal();
      queryClient.invalidateQueries({ queryKey: ["reward", rewardId] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleExchange = async () => {
    setIsExchangeModalOpen(true);
  };

  const handleCloseExchangeModal = () => {
    setIsExchangeModalOpen(false);
  };

  const handleConfirmExchange = () => {
    mutation.mutate(reward!.id);
  };

  if (isPending || profilePending) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!reward) {
    return <NotFoundRewardPage />;
  }

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto p-4 pt-[100px]">
        <Breadcrumbs
          className="mb-6 mt-2"
          paths={[
            { name: "Home", href: "/" },
            { name: "Rewards", href: "/reward" },
            { name: reward.name },
          ]}
        />

        <Card className="w-full flex flex-col transition-transform duration-300">
          {/* Card Header */}
          <CardHeader className="p-0">
            <img
              src={reward.image}
              alt={reward.name}
              className="w-full h-60 object-cover rounded-t-lg"
            />
          </CardHeader>

          {/* Card Content */}
          <CardContent className="p-4 flex-grow">
            <h1 className="text-3xl font-bold">{reward.name}</h1>
            <p className="text-gray-600 text-sm mb-4 line-clamp-4 mt-2">
              {reward.description}
            </p>

            <div className="flex items-center text-sm text-gray-500 gap-1 mt-4">
              <Calendar className="h-4 w-4" />
              <span>
                {format(new Date(reward.startDate), "MMM d, yyyy")} -{" "}
                {format(new Date(reward.endDate), "MMM d, yyyy")}
              </span>
            </div>

            {/* Conditions Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Conditions
              </h3>
              <p className="text-sm text-gray-600 mt-2">{reward.conditions}</p>
            </div>
          </CardContent>

          {/* Card Footer (Points and Type) */}
          <CardFooter className="p-4 mt-auto flex flex-col">
            <div className="flex justify-between items-center w-full">
              <Badge className="text-xs">{reward.rewardType.name}</Badge>
              <span className="text-xl font-bold text-blue-600">
                {reward.point.toLocaleString()} points
              </span>
            </div>
          </CardFooter>

          {/* Sticky Exchange Button */}
          <div className="w-full px-4 pb-4 overflow-hidden">
            <Button
              variant="default"
              onClick={handleExchange}
              className="w-full transition-all duration-200 ease-in-out"
              disabled={reward.isExchanged || reward.point > profile!.point}
            >
              {reward.isExchanged
                ? "Exchanged"
                : reward.point > profile!.point
                ? "Insufficient Points"
                : "Exchange Now"}
            </Button>
          </div>

          {/* Exchange Modal */}
          <Dialog
            open={isExchangeModalOpen}
            onOpenChange={setIsExchangeModalOpen}
          >
            <DialogContent
              className="max-w-md max-h-[80vh] overflow-y-auto sm:max-w-lg rounded-md"
              aria-description="Confirm Exchange"
              aria-describedby="Confirm Exchange"
            >
              <DialogHeader>
                <h2 className="text-lg font-semibold">Confirm Exchange</h2>
              </DialogHeader>
              <p className="text-gray-600">
                Are you sure you want to exchange your points?
              </p>
              <DialogFooter>
                <Button variant="ghost" onClick={handleCloseExchangeModal}>
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleConfirmExchange}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending && <Loader2 className="animate-spin" />}
                  Confirm Exchange
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    </div>
  );
};

export default RewardDetailPage;
