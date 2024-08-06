import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { Container, Row, Col } from "reactstrap";
import AllTodos from "./components/AllTodos";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./components/UpdateTodo";
import Menus from "./components/menus";
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
import Layout from "./components/Layout";
import { API } from "./services/api";
import { DataContext } from "./context/dataProvider";

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
        navigate("/home");
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
      </Routes>
    </>
  );
}

export default App;
