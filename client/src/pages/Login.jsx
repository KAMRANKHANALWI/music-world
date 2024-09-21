import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/users/login`,
        user
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(HideLoading());
      console.log(error);
    }
  };

  return (
    <div className="bg-[#191414] min-h-screen flex items-center justify-center">
      
      <div className="hidden lg:block w-1/2 p-5">
        <img
          className="rounded-lg w-3/4 h-auto mx-auto"
          src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Music"
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-[#1DB954]">
          Welcome Back!
        </h1>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
        />
        <button
          className="w-full bg-[#1DB954] text-white py-2 rounded-md hover:bg-[#1AAE3C] transition duration-200"
          onClick={login}
        >
          Login
        </button>
        <Link
          to="/register"
          className="block text-center mt-4 text-gray-600 underline"
        >
          Not yet Registered? Click Here to Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;