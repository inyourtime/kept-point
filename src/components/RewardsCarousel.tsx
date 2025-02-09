import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { RewardItem } from "@/services/reward";
import RewardCard from "./RewardCard";

interface RewardsCarouselProps {
  rewards: RewardItem[];
  title?: string;
  onRewardClick?: (reward: RewardItem) => void;
  isLoading: boolean;
}

const RewardsCarousel = ({
  rewards = [],
  onRewardClick,
  isLoading,
}: RewardsCarouselProps) => {
  const skeletonItems = Array.from({ length: 3 });

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
      plugins={[Autoplay({ delay: 2000 })]}
    >
      <CarouselContent className="mb-2 w-full">
        {isLoading
          ? skeletonItems.map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="w-full flex flex-col h-full animate-pulse">
                    <CardHeader className="p-0">
                      <div className="w-full h-32 sm:h-40 lg:h-48 bg-gray-300 rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 flex-grow flex flex-col">
                      <div className="w-3/4 h-5 bg-gray-300 rounded mb-2"></div>
                      <div className="w-full h-10 bg-gray-300 rounded mb-3 sm:mb-4"></div>
                      <div className="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
                    </CardContent>
                    <CardFooter className="p-3 sm:p-4 pt-0 mt-auto flex justify-between items-center">
                      <div className="w-16 h-5 bg-gray-300 rounded"></div>
                      <div className="w-20 h-6 bg-gray-300 rounded"></div>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))
          : rewards.map((reward, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
                <div className="p-1">
                  <RewardCard
                    reward={reward}
                    onRewardClick={onRewardClick}
                    key={reward.id}
                  />
                </div>
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:block pl-2" />
      <CarouselNext className="hidden sm:block pl-2" />
    </Carousel>
  );
};

export default RewardsCarousel;
