import { GetActiveMealDto } from "./get_active_meals.dto";

export interface GetMealHistoryDetailsResponsetDto extends GetActiveMealDto {
  collector: {
    username: string;
    profilePicture: string;
    collectionCount: number;
    contact: number;
    createdAt: string;
  } | null;
}
