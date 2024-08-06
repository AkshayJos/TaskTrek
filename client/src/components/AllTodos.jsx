import React, { useContext, useEffect, useState } from "react";
import Todo from "./Todo";
import { API } from "../services/api";
import { DataContext } from "../context/dataProvider";
import { Col, Container, Row } from "reactstrap";
import Header from "./Header";
import Menus from "./menus";

const AllTodos = () => {
  useEffect(() => {
    getAllTodosFromSever();
  }, []);

  const [todos, setTodos] = useState([]);
  const {account} = useContext(DataContext);

  const getAllTodosFromSever = async() => {
    try{
      const response = await API.getAllTodos({username : account.username});
      
    if(response.isSuccess){
      setTodos(response.data);
    }
    }catch(error){
      console.log(error.data);
    }
  };

  const deleteTodo = async(id) => {
    try{
      const response = await API.deleteTodo(id);
      
      if(response.isSuccess){
        getAllTodosFromSever();
      }
    }
    catch(error){
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
      <div className="text-center">
      <h3>All Todos</h3>
      <p>Following are the list of todos</p>
      {todos.length > 0
        ? todos.map((item) => <Todo todo={item} deleteTodo={deleteTodo} />)
        : "No Todos"}
    </div>
      </Col>
    </Row>
  </Container>
  );
};

export default AllTodos;
