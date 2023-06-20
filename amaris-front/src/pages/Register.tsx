import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { ingredients, nationalities } from "../utils/data";
import { API_URL } from "../utils/urls";
import { RegisterUser } from "../interfaces/Interfaces";
import FormInput from "../components/FormInput";

import AmarisLogo from "../assets/amaris.svg";

type FavoritesProps = {
  setUserData: any;
  userData: RegisterUser;
  ingredientsErrors: boolean;
  nationalitiesErrors: boolean;
};

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<RegisterUser>({
    name: null,
    email: null,
    age: null,
    phone: null,
    password: null,
    repeatPassword: null,
    favoriteIngredients: [],
    favoriteNationality: [],
  });
  
  const [ingredientsErrors, setIngredientsErrors] = useState<boolean>(false);
  const [nationalitiesErrors, setNationalitiesErrors] =
    useState<boolean>(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const onChange = ({ target }: any) => {
    setUserData({
      ...userData,
      [target.name]: target.value,
    });
  };

  const onClick = () => {
    if (
      userData.name &&
      userData.email &&
      userData.age &&
      userData.phone &&
      userData.password &&
      userData.repeatPassword
    ) {
      setShowFavorites(true);
    }

    if (userData.favoriteIngredients.length === 0) {
      setIngredientsErrors(true);
      return;
    }
    setIngredientsErrors(false);
    if (userData.favoriteNationality.length === 0) {
      setNationalitiesErrors(true);
      return;
    }
    setNationalitiesErrors(false);

    if (showFavorites) {
      if (
        userData.name &&
        userData.email &&
        userData.age &&
        userData.phone &&
        userData.password &&
        userData.repeatPassword &&
        userData.favoriteIngredients.length >= 1 &&
        userData.favoriteNationality.length >= 1
      ) {
        registerUser();
      }
    }
  };

  const registerUser = () => {
    const { repeatPassword, ...user } = userData;
    axios
      .post(`${API_URL}/user`, user)
      .then((response) => {
        const { user, code } = response.data;
        if (user && code === 201) {
          navigate(`/user/${user._id}`);
        }
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <img
          className="mx-auto h-10 w-auto"
          src={AmarisLogo}
          alt="Amaris Logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register a new account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        {showFavorites ? (
          <Favorites
            setUserData={setUserData}
            userData={userData}
            ingredientsErrors={ingredientsErrors}
            nationalitiesErrors={nationalitiesErrors}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <FormInput name="name" label="Name" onChange={(e) => onChange(e)} />
            <FormInput
              name="email"
              type="email"
              label="Email address"
              onChange={(e) => onChange(e)}
            />
            <FormInput
              name="age"
              type="number"
              label="Age"
              onChange={(e) => onChange(e)}
            />
            <FormInput
              name="phone"
              label="Phone"
              onChange={(e) => onChange(e)}
            />
            <FormInput
              name="password"
              type="password"
              label="Password"
              onChange={(e) => onChange(e)}
            />
            <FormInput
              name="repeatPassword"
              type="password"
              label="Repeat Password"
              onChange={(e) => onChange(e)}
            />
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            onClick={onClick}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          <Link
            to={`/`}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const Favorites = ({
  setUserData,
  userData,
  ingredientsErrors,
  nationalitiesErrors,
}: FavoritesProps) => {
  const [ingredientsData, setIngredients] = useState<string[]>([]);
  const [nationalitiesData, setNationalities] = useState<string[]>([]);

  useEffect(() => {
    setUserData({
      ...userData,
      favoriteIngredients: ingredientsData,
      favoriteNationality: nationalitiesData,
    });
  }, [ingredientsData, nationalitiesData]);

  const onChangeIngredients = ({ target }) => {
    const { value, checked } = target;
    if (checked) {
      setIngredients([...ingredientsData, value]);
    } else {
      setIngredients(ingredientsData.filter((item) => item !== value));
    }
  };

  const onChangeNationality = ({ target }) => {
    const { value, checked } = target;
    if (checked) {
      setNationalities([...nationalitiesData, value]);
    } else {
      setNationalities(nationalitiesData.filter((item) => item !== value));
    }
  };

  return (
    <div>
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
      {ingredientsErrors && (
        <p className="text-red-500 mt-2">Select at least 1 ingredient</p>
      )}

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
      {nationalitiesErrors && (
        <p className="text-red-500 mt-2">Select at least 1 nationality</p>
      )}
    </div>
  );
};

export default Register;
