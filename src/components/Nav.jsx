import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { RiUserSmileFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

const Nav = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  //logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("Logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="bg-gray-100">
      <nav className="flex xl:pl-64 xl:pr-64 justify-between items-center w-[92%]  mx-auto">
        <div className="flex p-2">
          {user.emailVerified && (
            <>
              <img
                className="mt-1 h-10 w-10 rounded-full cursor-pointer"
                src={user.photoURL}
                alt="..."
              />
              <p className="text-gray-700 p-3 font-medium text-lg ">
                {user && user.displayName}
              </p>
            </>
          )}
          {!user.emailVerified && (
            <>
              <RiUserSmileFill
                style={{ color: "white" }}
                className=" h-12 w-12 rounded-full cursor-pointer"
              />
              <p className="text-white origin-left font-medium text-xl duration-200">
                {user && user.displayName}
              </p>
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={handleLogout}
            className="bg-[#a6c1ee] text-white px-5 py-2 rounded-xl hover:bg-[#4b7aca]"
          >
            Sair
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
