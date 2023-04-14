import React from 'react';
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const CompanyListing = () => {

  const sampleCompanies = [
    {
      image: 'images/sample-image-landscape.png',
      name: 'RevaComm',
      text: 'A mission-driven digital transformation firm focused on Agile DevSecOps practices that deliver scale, speed, and security for government agencies and enterprises facing continually evolving IT needs and cyber security threats.',
      link: '#',
    },
    {
      image: 'images/sample-image-landscape.png',
      name: 'NASA',
      text: 'NASA explores the unknown in air and space, innovates for the benefit of humanity, and inspires the world through discovery.',
      link: '#',
    },
    {
      image: 'images/sample-image-landscape.png',
      name: 'ISEC',
      text: 'The mission of ISEC Conferences is to enhance communication and understanding between structural, system, and construction engineers, for successful design and construction of engineering projects.',
      link: '#',
    },
    {
      image: 'images/sample-image-landscape.png',
      name: 'OpenAI',
      text: 'ChatGPT is a state-of-the-art language model developed by OpenAI, capable of providing personalized and intelligent responses to a wide range of queries and conversations.',
      link: '#',
    },
    {
      image: 'images/sample-image-landscape.png',
      name: 'Sample',
      text: 'Sample-text',
      link: '#',
    },
    {
      image: 'images/sample-image-landscape.png',
      name: 'Sample-2',
      text: 'Sample-text-2',
      link: '#',
    },
  ];

  return (
    <Container id="company-listing" className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={3}>
          <Sidebar />
        </Col>
        <Col>
          <Row>
            { sampleCompanies.map(({ image, name, text, link }, index) => (

              <Col xs={12} md={4}>
                <Card id="company-card">
                  <Card.Img id="company-card-image" variant="top" src={image} />
                  <Card.Title id="company-card-title">{name}</Card.Title>
                  <Card.Text id="company-card-text">{text}</Card.Text>
                  <Card.Link id="company-card-link" to={link}><Button>Visit</Button></Card.Link>
                </Card>
              </Col>
            )) }
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanyListing;
