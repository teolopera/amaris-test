import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { API_URL } from "../utils/urls";
import {
  Food,
  Restaurant,
  User as UserInterface,
} from "../interfaces/Interfaces";

function User() {
  const { userId } = useParams();
  const [userData, setUserData] = useState<UserInterface | null>(null);
  const [favoriteFood, setFavoriteFood] = useState<Food[] | null>(null);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[] | null>(null)    

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      getFavoriteFood(userData.favoriteIngredients);
      getFavoriteRestaurants(userData.favoriteNationality)
    }
  }, [userData]);

  const getUserData = async () => {
    await axios
      .get(`${API_URL}/user/${userId}`)
      .then(function (response) {
        const { data } = response;
        setUserData(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getFavoriteFood = async (foodOpts: string[]) => {
    await axios
      .post(`${API_URL}/food/getFavorites`, { ingredients: foodOpts })
      .then((response) => {
        setFavoriteFood(response.data);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  const getFavoriteRestaurants = async (nationalityOpts: string[]) => {
    await axios
      .post(`${API_URL}/restaurant/getFavorites`, { nationality: nationalityOpts })
      .then((response) => {
        
        setFavoriteRestaurants(response.data);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  if (!userData) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h1 className="text-7xl font-extrabold">
          Hi{" "}
          <span className="dark:bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text dark:text-transparent">
            {userData.name}!
          </span>
        </h1>

        <div className="mt-4">
          <h4 className="text-2xl font-semibold">
            These are the preferences based on your tastes
          </h4>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h5 className="text-xl font-semibold">
                Your &#128525; Ingredients &#127857;
              </h5>
              {userData?.favoriteIngredients.map((ingredient) => (
                <ul className="list-disc px-6" key={ingredient}>
                  <li>{ingredient}</li>
                </ul>
              ))}
            </div>
            <div>
              <h5 className="text-xl font-semibold">
                Your &#128525; Nationalities &#127857;
              </h5>
              {userData?.favoriteNationality.map((nationality) => (
                <ul className="list-disc px-6" key={nationality}>
                  <li>{nationality}</li>
                </ul>
              ))}
            </div>
          </div>
          <h1 className="text-xl font-extrabold mt-4">
            <span className="dark:bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text dark:text-transparent">
              Recommended Food
            </span>
          </h1>
          {favoriteFood &&
            favoriteFood.length >= 1 ?
            favoriteFood?.map((food) => (
              <p key={food._id}>{food?.name}</p>
            )) : <p>No favorite food based on ingredients. </p>}
          <h1 className="text-xl font-extrabold mt-2">
            <span className="dark:bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text dark:text-transparent">
              Recommended Restaurants
            </span>
          </h1>
          {favoriteRestaurants &&
            favoriteRestaurants?.map((restaurant) => (
              <p key={restaurant._id}>
                {restaurant?.name} - {restaurant?.nationality}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default User;
