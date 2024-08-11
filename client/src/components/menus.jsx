import React from "react";
import { Link } from "react-router-dom";

const Menus = () => {

   const logout = () => {
    document.cookie = "accessToken=; Path=/;";
    document.cookie = "refreshToken=; Path=/;";
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 mr-3">
  <div className="bg-gray-100 px-4 py-2 font-semibold text-gray-700 rounded-lg font-serif">Menus</div>
  <div className="flex flex-col divide-y divide-gray-200">
    <Link
      to="/"
      className="px-4 py-2 text-gray-700 hover:bg-gray-50 no-underline font-serif"
    >
      Home
    </Link>

    <Link
      to="/add-todo"
      className="px-4 py-2 text-gray-700 hover:bg-gray-50 no-underline font-serif"
    >
      Add Todo
    </Link>

    <Link
      to="/view-todo"
      className="px-4 py-2 text-gray-700 hover:bg-gray-50 no-underline font-serif"
    >
      View Todos
    </Link>

    <Link
      to="/about"
      className="px-4 py-2 text-gray-700 hover:bg-gray-50 no-underline font-serif"
    >
      About
    </Link>

    <Link
      to="/login"
      className="px-4 py-2 text-gray-700 hover:bg-gray-50 no-underline font-serif"
      onClick={logout}
    >
      Log out
    </Link>
  </div>
</div>

  );
};

export default Menus;
