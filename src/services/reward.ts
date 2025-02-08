import axiosInstance from "./provider/axios";

export interface RewardItem {
  id: string;
  name: string;
  point: number;
  startDate: Date;
  endDate: Date;
  image: string;
  description: string | null;
  rewardType: {
    id: string;
    name: string;
  };
}

export const getRewards = async () => {
  const response = await axiosInstance.get<RewardItem[]>("/rewards");
  return response.data;
};

interface RewardDetail extends RewardItem {
  conditions: string | null;
  isExchanged: boolean;
}

export const getReward = async (id: string) => {
  const response = await axiosInstance.get<RewardDetail>(`/rewards/${id}`);
  return response.data;
};

interface RewardType {
  id: string;
  name: string;
}

export const getRewardTypes = async () => {
  const response = await axiosInstance.get<RewardType[]>("/rewards/types");
  return response.data;
};

export const postExchangeReward = async (id: string) => {
  const response = await axiosInstance.post(`/rewards/exchange`, {
    rewardId: id,
  });
  return response.data;
};
