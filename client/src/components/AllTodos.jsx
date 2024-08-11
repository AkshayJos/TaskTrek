import React, { useContext, useEffect, useState } from "react";
import Todo from "./Todo";
import { API } from "../services/api";
import { DataContext } from "../context/dataProvider";
import Header from "./Header";
import Menus from "./menus";
import toast from "react-hot-toast";

const AllTodos = () => {
  useEffect(() => {
    getAllTodosFromSever();
  }, []);

  const [todos, setTodos] = useState([]);
  const { account } = useContext(DataContext);

  const getAllTodosFromSever = async () => {
    try {
      const response = await API.getAllTodos({ username: account.username });

      if (response.isSuccess) {
        setTodos(response.data);
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await API.deleteTodo(id);

      if (response.isSuccess) {
        getAllTodosFromSever();
        toast.success("Todo deleted successfully!");
      }
    } catch (error) {
      toast.error(error.msg);
    }
  };

  return (
    <div className="container mx-auto lg:px-40 px-4">
      <Header />
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3">
          <Menus />
        </div>

        <div className="w-full md:w-2/3">
          <div className="text-center mt-3 space-y-3 mb-10">
            <h3 className="font-serif font-semibold text-2xl">All Todos</h3>
            <p className="font-serif">Following are the list of todos</p>
            {todos.length > 0
              ? todos.map((item) => (
                  <Todo key={item.id} todo={item} deleteTodo={deleteTodo} />
                ))
              : "No Todos"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTodos;
