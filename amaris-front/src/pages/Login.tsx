import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../utils/urls";
import { Login } from "../interfaces/Interfaces";
import FormInput from "../components/FormInput";

import AmarisLogo from "../assets/amaris.svg";
import MessageAlert from "../components/MessageAlert";

function App() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<Login>({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const userLogin = (data: Login) => {
    axios
      .post(`${API_URL}/user/login`, data)
      .then((response) => {
        const { user, code, message } = response.data;
        if (code !== 200) {
          setError(message);
          return;
        }
        navigate(`/user/${user._id}`);
      })
      .catch((error) => {
        console.error("Error login", error);
      });
  };

  const handleChange = (event: any) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const onClick = (event: any) => {
    event.preventDefault();
    userLogin(loginData);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={AmarisLogo}
          alt="Amaris Logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onClick}>
          <FormInput
            name="email"
            type="email"
            label="Email address"
            onChange={(e) => handleChange(e)}
          />
          <FormInput
            name={"password"}
            type={"password"}
            label={"Password"}
            onChange={(e) => handleChange(e)}
          />
          {error && <MessageAlert text={error} />}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="mt-4">
            <button
              onClick={() => {navigate('/noregistered')}}
              className="flex w-full justify-center text-indigo-500 rounded-md border-2 border-indigo-500 bg-white px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Use without user
            </button>
          </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Not a member?
          <Link
            to={`register`}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default App;
