import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { RewardItem } from "@/services/reward";

interface RewardsCarouselProps {
  rewards: RewardItem[];
  title?: string;
  onRewardClick?: (reward: RewardItem) => void;
  isLoading: boolean;
}

const RewardsCarousel = ({
  rewards = [],
  title = "Available Rewards",
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
      plugins={[Autoplay({ delay: 4000 })]}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-6 px-4 sm:px-0">
        {title}
      </h2>
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
                  <Card
                    key={`${reward.id}-${index}`}
                    className="w-full flex flex-col h-full transition-transform duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => onRewardClick?.(reward)}
                  >
                    <CardHeader className="p-0">
                      <img
                        src={reward.image}
                        alt={reward.name}
                        className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-t-lg"
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
                        <Badge className="text-xs">
                          {reward.rewardType.name}
                        </Badge>
                        <span className="text-lg sm:text-xl font-bold text-blue-600">
                          {reward.point.toLocaleString()} points
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
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
