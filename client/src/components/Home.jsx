import {React} from "react";
import { Button, Col, Container, Row } from "reactstrap";
import Menus from "./menus";
import Header from "./Header";

const Home = () => {

  return (
    <Container>
    <Header />
    <Row>
      <Col md={4}>
        <Menus />
      </Col>

      <Col md={8}>
      <div>
      <Container style={{ backgroundColor : '#e9ecef',textAlign : "center", borderRadius : 20}}>

        <h1 className="py-2">Welcome to Todos</h1>
        <hr className="my-2"/>
        <p className="pt-3">This is a todo application developed by Akshay Kumar Joshi.</p>
        <p className="pb-2">Here you can add , delete and update your Todos.</p>
        <Button color="primary mb-4" outline>Start using</Button>
      </Container>
    </div>
      </Col>
    </Row>
  </Container>
    
  );
};

export default Home;