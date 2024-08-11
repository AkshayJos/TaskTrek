import { React } from "react";
import Menus from "./menus";
import Header from "./Header";

const Home = () => {
  return (
    <div className="mx-auto lg:px-40 px-4 container">
  <Header />
  <div className="flex flex-wrap">
    <div className="w-full md:w-1/3">
      <Menus />
    </div>

    <div className="w-full md:w-2/3">
      <div className="mt-2">
        <div className="bg-gray-100 text-center rounded-lg p-4">
          <h1 className="py-2 font-serif font-semibold text-2xl">Welcome to Todos</h1>
          <hr className="my-2 border-t-2 border-gray-300" />
          <p className="pt-3 font-serif">
            This is a todo application developed by Akshay Kumar Joshi.
          </p>
          <p className="pb-2 font-serif">
            Here you can add, delete, and update your Todos.
          </p>
          <button className="hover:bg-gradient-to-r from-sky-400 to-blue-500 hover:text-white mb-4 font-serif px-4 py-2 rounded-lg border border-blue-400 bg-transparent">
            Start using
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Home;
