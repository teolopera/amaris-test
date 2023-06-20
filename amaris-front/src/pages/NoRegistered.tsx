import { Dispatch, SetStateAction, useState } from "react";

import { ingredients, nationalities } from "../utils/data";
import { getFavoriteFood, getFavoriteRestaurants } from "../utils/fetchData";
import MessageAlert from "../components/MessageAlert";
import { Food, Restaurant } from "../interfaces/Interfaces";

type FavoriteProps = {
  ingredientsData: string[];
  nationalitiesData: string[];
  favorites: any;
  setShowFavorites: Dispatch<SetStateAction<boolean>>;
  setIngredients: Dispatch<SetStateAction<string[]>>;
  setNationalities: Dispatch<SetStateAction<string[]>>;
};

const NoRegistered = () => {
  const [ingredientsData, setIngredients] = useState<string[]>([]);
  const [nationalitiesData, setNationalities] = useState<string[]>([]);
  const [favorites, setFavorites] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [error, setError] = useState(false);
  
  const onChangeIngredients = ({ target }: Event | any) => {
    const { value, checked } = target;
    if (checked) {
      setIngredients([...ingredientsData, value]);
    } else {
      setIngredients(ingredientsData.filter((item) => item !== value));
    }
  };

  const onChangeNationality = ({ target }: Event | any) => {
    const { value, checked } = target;
    if (checked) {
      setNationalities([...nationalitiesData, value]);
    } else {
      setNationalities(nationalitiesData.filter((item) => item !== value));
    }
  };

  const onClick = async () => {
    if (ingredientsData.length === 0 || nationalitiesData.length === 0) {
      setError(true);
      return;
    }
    const favoriteRestaurants = await getFavoriteRestaurants(nationalitiesData);
    const favoriteFood = await getFavoriteFood(ingredientsData);
    if (favoriteRestaurants || favoriteFood) {
      setFavorites({ favoriteFood, favoriteRestaurants });
      setShowFavorites(true);
    }
    setError(false);
  };
  
  if (showFavorites) {
    return (
      <ShowFavorites
        ingredientsData={ingredientsData}
        nationalitiesData={nationalitiesData}
        favorites={favorites}
        setShowFavorites={setShowFavorites}
        setIngredients={setIngredients}
        setNationalities={setNationalities}
      />
    );
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="mt-2 text-xl font-semibold leading-9 tracking-tight text-gray-900">
          Favorite ingredients
        </h2>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {ingredients.map((ingredient) => (
            <label
              key={ingredient}
              htmlFor={ingredient}
              className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-2"
            >
              <input
                id={ingredient}
                name={ingredient}
                type="checkbox"
                value={ingredient}
                onChange={onChangeIngredients}
                className="rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {ingredient}
            </label>
          ))}
        </div>

        <h2 className="mt-3 text-xl font-semibold leading-9 tracking-tight text-gray-900">
          Favorite nationality food
        </h2>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {nationalities.map((nationality) => (
            <label
              key={nationality}
              htmlFor={nationality}
              className="text-sm font-medium leading-6 text-gray-900 flex items-center gap-2"
            >
              <input
                id={nationality}
                name={nationality}
                type="checkbox"
                value={nationality}
                onChange={onChangeNationality}
                className="rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {nationality}
            </label>
          ))}
        </div>
        {error && (
          <div className="mt-4">
            <MessageAlert text="You have to select at least 1 element on each." />
          </div>
        )}
        <div className="mt-6">
          <button
            onClick={onClick}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const ShowFavorites = ({
  ingredientsData,
  nationalitiesData,
  favorites,
  setShowFavorites,
  setIngredients,
  setNationalities,
}: FavoriteProps) => {
  const returnToSelection = (): void => {
    setIngredients([]);
    setNationalities([]);
    setShowFavorites(false);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <h1 className="text-7xl font-extrabold">
          <span className="dark:bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text dark:text-transparent">
            Hi!
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
              {ingredientsData.map((ingredient) => (
                <ul className="list-disc px-6" key={ingredient}>
                  <li>{ingredient}</li>
                </ul>
              ))}
            </div>
            <div>
              <h5 className="text-xl font-semibold">
                Your &#128525; Nationalities &#127857;
              </h5>
              {nationalitiesData.map((nationality) => (
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
          {favorites?.favoriteFood.length >= 1 ? (
            favorites?.favoriteFood.map((food: Food) => (
              <p key={food._id}>{food?.name}</p>
            ))
          ) : (
            <p>No favorite food based on ingredients. </p>
          )}
          <h1 className="text-xl font-extrabold mt-2">
            <span className="dark:bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text dark:text-transparent">
              Recommended Restaurants
            </span>
          </h1>
          {favorites?.favoriteRestaurants.map((restaurant: Restaurant) => (
            <p key={restaurant._id}>
              {restaurant?.name} - {restaurant?.nationality}
            </p>
          ))}
        </div>
        <div className="mt-6">
          <button
            onClick={returnToSelection}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search again
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoRegistered;
