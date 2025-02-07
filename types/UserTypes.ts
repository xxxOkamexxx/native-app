import * as Location from "expo-location"

export interface IUser {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  phoneNumber: string
  email: string;
  country: string;
  city: string;
  street: string;
  postalCode: string;
  about: string;
  profileImage: string;
  roleId: number;
  username: string;
  password?: string | undefined;
}
