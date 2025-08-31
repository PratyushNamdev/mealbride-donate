export interface GetUserProfileResponseDto {
  _id: string;
  username: string;
  profilePicture: string;
  email: string;
  address: string[] | null;
  __v: number;
}
