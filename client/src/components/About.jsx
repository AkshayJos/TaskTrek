import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Header from './Header';
import Menus from './menus';

const About = () =>{
    return(
        <Container>
        <Header />
        <Row>
          <Col md={4}>
            <Menus />
          </Col>

          <Col md={8}>
          <h2 className='text-center'>This is About Section.</h2>
          </Col>
        </Row>
      </Container>
       
    )
}

export default About;