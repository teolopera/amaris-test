import axios from "axios";

import { API_URL } from "./urls";
import { Food, Restaurant } from "../interfaces/Interfaces";

export const getFavoriteRestaurants = async (
  nationalityOpts: string[]
): Promise<Restaurant[]> => {
  return await axios
    .post(`${API_URL}/restaurant/getFavorites`, {
      nationality: nationalityOpts,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating post:", error);
    });
};

export const getFavoriteFood = async (foodOpts: string[]): Promise<Food[]> => {
  return await axios
    .post(`${API_URL}/food/getFavorites`, { ingredients: foodOpts })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating post:", error);
    });
};
