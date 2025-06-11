import { GetActiveMealDto } from "./get_active_meals.dto";

interface GetActiveMealDetailResponseDto extends GetActiveMealDto {
  collector: {
    username: string;
    profilePicture: string;
    collectionCount: number;
    email: string;
    createdAt: string;
  } | null;
}

export default GetActiveMealDetailResponseDto;
