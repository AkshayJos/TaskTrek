import {useContext, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from "reactstrap";
import { API } from "../services/api";
import { DataContext } from "../context/dataProvider";
import Header from "./Header";
import Menus from "./menus";
import { useNavigate } from "react-router-dom";

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
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <Label className="font-semibold" for="todoTitle">Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Enter Title here.."
                onChange={(e) => {
                  setTodo({ ...todo, title: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label className="font-semibold" for="todoDescription">Description</Label>
              <Input
                type="textarea"
                name="description"
                placeholder="Enter Description here.."
                style={{ height: 100 }}
                onChange={(e) => {
                  setTodo({ ...todo, description: e.target.value });
                }}
              />
            </FormGroup>

            <FormGroup className="text-center">
              <Button type="submit" color="success" onClick={() => {}}>
                Add Todo
              </Button>
              <Button
                type="reset"
                color="warning"
                className="m-3"
                onClick={() => {}}
              >
                Clear
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTodo;
