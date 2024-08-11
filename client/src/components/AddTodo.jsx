import {useContext, useState } from "react";
import { API } from "../services/api";
import { DataContext } from "../context/dataProvider";
import Header from "./Header";
import Menus from "./menus";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddTodo = () => {

  const navigate = useNavigate();
  const { account } = useContext(DataContext);

  const IntialTodo = {
    author: account._id,
    title: "",
    description: "",
    createDate : new Date()
  };

  const [todo, setTodo] = useState(IntialTodo);

  const handleForm = (e) => {
    e.preventDefault();
    postDataOnServer(todo);
    setTodo(IntialTodo);
  };

  const postDataOnServer = async(data) => {
    try {
      const response = await API.createTodo(data);
      if (response.isSuccess) {
        navigate('/view-todo');
        toast.success("Todo added successfully!")
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

    <div className="w-full md:w-2/3 px-4">
      <form
        onSubmit={handleForm}
        className="mx-5"
      >
        <h2 className="text-center text-2xl font-semibold mt-3 font-serif">Fill Todo Details</h2>

        <div className="mb-4">
          <label className="font-semibold block mb-2 font-serif" htmlFor="todoTitle">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Title here.."
            className="w-full px-2 py-2 border border-gray-300 rounded-md outline-none font-serif"
            onChange={(e) => {
              setTodo({ ...todo, title: e.target.value });
            }}
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold block mb-2 font-serif" htmlFor="todoDescription">Description</label>
          <textarea
            name="description"
            placeholder="Enter Description here.."
            className="w-full px-2 py-2 border border-gray-300 rounded-md outline-none font-serif"
            style={{ height: '100px' }}
            onChange={(e) => {
              setTodo({ ...todo, description: e.target.value });
            }}
          />
        </div>

        <div className="text-center mb-8">
          <button
            type="submit"
            className="bg-green-600 text-white font-serif  py-2 px-4 rounded-xl"
            onClick={() => {}}
          >
            Add Todo
          </button>
          <button
            type="reset"
            className="bg-yellow-500 text-white font-serif py-2 px-4 rounded-xl ml-3"
            onClick={() => {}}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default AddTodo;
