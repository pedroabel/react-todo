import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const { signIn } = UserAuth();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //default login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-slate-200 ">
      <div className="w-full max-w-xs m-auto rounded p-5">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-center text-lg font-bold">Login</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="******************"
            />
            <p className="text-sm">
              Nao possui uma conta?
              <Link
                className="p-2 text-red-500 hover:text-red-700 "
                to="/register"
              >
                Registrar
              </Link>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 content-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Sign In
            </button>
          </div>
        </form>
        <button
          onClick={GoogleLogin}
          className=" gap-2 text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
