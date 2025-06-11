import { GetActiveMealDto } from "./get_active_meals.dto";

interface GetActiveMealDetailsResponseDto extends GetActiveMealDto {
  collector: {
    username: string;
    profilePicture: string;
    collectionCount: number;
    contact: number;
    createdAt: string;
  } | null;
}

export default GetActiveMealDetailsResponseDto;
