import React from 'react'
import {Container, Col, Row } from 'reactstrap'
import Header from './Header'
import { Route, Routes, useParams } from 'react-router-dom'
import Home from './Home'
import AddTodo from './AddTodo'
import AllTodos from './AllTodos'
import UpdateTodo from './UpdateTodo'
import About from './About'
import Menus from './menus'

const Layout = () => {
  const {path} = useParams();
  let component;
  let todoId;

  switch(path){
    case 'home' : component = <Home/>
               break;

    case "add-todo" : component = <AddTodo/>
                      break;

    case 'view-todo' : component = <AllTodos/>
                        break;
                      
    case 'about' : component = <About/>
                    break;
  }

  return (
    <Container>
          <Header />
          <Row>
            <Col md={4}>
              <Menus />
            </Col>

            <Col md={8}>
             {component}
            </Col>
          </Row>
        </Container>
  )
}

export default Layout;
