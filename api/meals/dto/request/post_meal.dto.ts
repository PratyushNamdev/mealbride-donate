export interface PostMealRequestDto {
  image: string;
  foodDesc: string;
  veg: boolean;
  feedsUpto: number;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: number;
  preferredTime: Date;
  expiryDate: Date;
}
