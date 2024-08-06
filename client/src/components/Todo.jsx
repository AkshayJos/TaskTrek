import React from "react";
import {
  Card,
  CardText,
  CardBody,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

const Todo = ({ todo, deleteTodo }) => {

  return (
    <div className="text-center" style={{ margin: 10 }}>
      <Card>
        <CardBody>
          <h5>{todo.title}</h5>
          <CardText>{todo.description}</CardText>
          
          <Button color="warning">
            <Link
              className="list-group-item list-group-item-action"
              tag="a"
              to={`/update-todo/${todo._id}`}
              action
            >
              Update
            </Link>
          </Button>

          <Button
            color="danger"
            className="mx-3"
            onClick={() => {
              deleteTodo(todo._id);
            }}
          >
            Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Todo;
