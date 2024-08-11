import "./App.css";
import Home from "./components/Home";
import AllTodos from "./components/AllTodos";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./components/UpdateTodo";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import About from "./components/About";
import { useContext, useEffect, useState } from "react";
import { getToken } from "./utils/common-utils";
import Login from "./components/Login";
import { API } from "./services/api";
import { DataContext } from "./context/dataProvider";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from "react-hot-toast";

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  const token = getToken("accessToken")?.split(" ")[1];
  const navigate = useNavigate();
  const location = useLocation();
  const { setAccount } = useContext(DataContext);

  useEffect(() => {
    getAuthenticated();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname === "/login") {
        navigate("/");
      } else {
        navigate(`${location.pathname}`);
      }
    }
  }, [isAuthenticated]);

  const getAuthenticated = async () => {
    if (token) {
      try {
        const response = await API.authenticate(token);
        if (response.isSuccess) {
          setAccount({
            _id: response.data._id,
            username: response.data.username,
            name: response.data.name,
          });
          isUserAuthenticated(true);
        }
      } catch (error) {}
    }
  };

  const PrivateRoute = ({ isAuthenticated, ...props }) => {
    return isAuthenticated || token ? (
      <>
        <Outlet />
      </>
    ) : (
      <Navigate replace to="/login" />
    );
  };

  return (
    <>
    <div>
        <Toaster position="top-right" toastOptions={{success : { theme :{ primary : '#4aed88'}}}} >
        </Toaster>
      </div>
      <Routes>
        <Route
          path="/login"
          element={<Login isUserAuthenticated={isUserAuthenticated} />}
        />

        <Route
          path="/"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/" element={<Home />} />
        </Route>

        <Route
          path="/add-todo"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/add-todo" element={<AddTodo />} />
        </Route>

        <Route
          path="/view-todo"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/view-todo" element={<AllTodos />} />
        </Route>

        <Route
          path="/update-todo/:todoId"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/update-todo/:todoId" element={<UpdateTodo />} />
        </Route>

        <Route
          path="/about"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/about" element={<About />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
