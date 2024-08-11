import { React, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Menus from "./menus";
import { API } from "../services/api";
import { DataContext } from "../context/dataProvider";
import toast from "react-hot-toast";

const UpdateTodo = () => {
  const { account } = useContext(DataContext);
  const { todoId } = useParams();

  useEffect(() => {
    document.title = "Update Todo";
    getTodoById(todoId);
  }, []);

  const IntialTodo = {
    author: account._id,
    title: "",
    description: "",
  };

  const [todo, setTodo] = useState(IntialTodo);
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    updateTodoOnServer(todo);
  };

  const updateTodoOnServer = async (todo) => {
    try {
      const response = await API.updateTodo(todo);
      if (response.isSuccess) {
        navigate("/view-todo");
        toast.success("Todo updated successfully!");
      }
    } catch (error) {
      toast.error(error.msg);
    }
  };

  const getTodoById = async (id) => {
    try {
      const response = await API.getTodoById(id);
      if (response.isSuccess) {
        setTodo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto lg:px-40 px-5">
      <Header />
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3">
          <Menus />
        </div>

        <div className="w-full md:w-2/3 mt-4">
          <form onSubmit={handleForm} className="mx-5">
            <h2 className="text-center text-2xl font-bold mb-2 font-serif">
              Fill Todo Details
            </h2>

            <div className="mb-4">
              <label
                className="font-semibold block mb-2 font-serif"
                htmlFor="todoTitle"
              >
                Title
              </label>
              <input
                type="text"
                name="todoTitle"
                placeholder="Enter description here..."
                value={todo.title}
                onChange={(e) => {
                  setTodo({ ...todo, title: e.target.value });
                }}
                className="w-full px-3 py-2 border rounded-lg outline-none font-serif"
              />
            </div>

            <div className="mb-2">
              <label
                className="font-semibold block mb-2 font-serif"
                htmlFor="todoDescription"
              >
                Description
              </label>
              <textarea
                name="todoDescription"
                placeholder="Enter title here..."
                value={todo.description}
                onChange={(e) => {
                  setTodo({ ...todo, description: e.target.value });
                }}
                className="w-full px-3 py-2 border rounded-lg outline-none font-serif"
                style={{ height: "100px" }}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 mb-8 rounded-lg font-serif"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
