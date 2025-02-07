import api from "./config";

// Get user by id
export const GetUserById = async (UserId: string) => {
  try{
    const { data } = await api.get(`/User/GetUser-id?userId=${UserId}`);

    return data;
  } catch (error) {
    console.log(error);
    
  }
}

