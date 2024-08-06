import React from "react";
import { Card, CardHeader, ListGroup } from "reactstrap";
import { Link } from "react-router-dom";

const Menus = () => {

   const logout = () => {
    document.cookie = "accessToken=; Path=/;";
    document.cookie = "refreshToken=; Path=/;";
  };

  return (
    <Card className="mb-3">
      <CardHeader>Menus</CardHeader>
      <ListGroup>

        <Link
          className="list-group-item list-group-item-action"
          to="/"
          action
        >
          Home
        </Link>

        <Link
          className="list-group-item list-group-item-action"
          to="/add-todo"
          action
        >
          Add Todo
        </Link>

        <Link
          className="list-group-item list-group-item-action"
          to="/view-todo"
          action
        >
          View Todos
        </Link>

        <Link
          className="list-group-item list-group-item-action"
          to="/about"
          action
        >
          About
        </Link>

        <Link
          className="list-group-item list-group-item-action"
          to="/login"
          action
          onClick={logout}
        >
          Log out
        </Link>
      </ListGroup>
    </Card>
  );
};

export default Menus;
