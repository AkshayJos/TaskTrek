import { React, useContext, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Menus from "./menus";
import { API } from "../services/api";
import { DataContext } from "../context/dataProvider";

const UpdateTodo = () => {
  const {account} = useContext(DataContext);
  const {todoId} = useParams();

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

  const updateTodoOnServer = async(todo) => {
    try{
    const response = await API.updateTodo(todo);
    if(response.isSuccess){
        navigate('/view-todo');
    }
    }
    catch(error){
      console.log(error);
    }
  };

  const getTodoById = async(id) =>{
    try{
        const response = await API.getTodoById(id);
        if(response.isSuccess){
          setTodo(response.data);
        }
    }
    catch(error){
        console.log(error);
    }
  }

  return (
    <Container>
      <Header />
      <Row>
        <Col md={4}>
          <Menus />
        </Col>

        <Col md={8}>
          <Form 
            onSubmit={handleForm}
            style={{ marginLeft: 20, marginRight: 20 }}
          >
            <h2 className="text-center">Fill Todo Details</h2>

            <FormGroup>
              <Label className="font-semibold" for="todoTitle">Todo Title</Label>
              <Input
                type="text"
                name="todoTitle"
                placeholder="Enter description here..."
                value={todo.title}
                onChange={(e) => {
                  setTodo({ ...todo, title: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label className="font-semibold" for="todoDescription">Todo Description</Label>
              <Input
                type="textarea"
                name="todoDescription"
                placeholder="Enter title here..."
                value={todo.description}
                style={{ height: 100 }}
                onChange={(e) => {
                  setTodo({ ...todo, description: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup className="text-center">
              <Button type="submit" color="success">
                Update
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateTodo;
