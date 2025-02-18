import { IUser } from "@/types/UserTypes";
import api from "./config";


// Update Staff
export const updateStaff = async (userData: Partial<IUser>) => {
  try {
    const response = await api.put("/Staff/UpdateStaff", userData );

    return response;
  } catch (error) {
    console.log(error);   
  }
};