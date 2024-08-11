import React from "react";
import { Link } from "react-router-dom";

const Todo = ({ todo, deleteTodo }) => {
  return (
    <div className="text-center m-2.5">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h5 className="text-lg font-semibold break-words font-serif">
          {todo.title}
        </h5>
        <p className="text-gray-700 break-words font-serif">
          {todo.description}
        </p>

        <div className="flex justify-center mt-2">
          <Link
            to={`/update-todo/${todo._id}`}
            className="bg-yellow-500 text-white py-2 px-4 rounded-xl no-underline font-serif"
          >
            Update
          </Link>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-xl ml-3 font-serif"
            onClick={() => deleteTodo(todo._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
