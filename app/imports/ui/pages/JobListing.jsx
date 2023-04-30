import React from 'react';
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import HelpButton from '../components/HelpButton';
import Sidebar from '../components/Sidebar';

const JobListing = () => {

  const sampleCompanies = [
    {
      image: 'images/sample-image-landscape.png',
      title: 'Research Assistant',
      company: 'University of Hawaii at Manoa',
      description: 'Seeking student majoring in astrophysics, with upperclassmen standing. Research conducted on black holes and neutron stars. Student wages offered.',
      link: '#',
    },
    {
      image: 'images/sample-image-landscape.png',
      title: 'Data Scientist at OpenAI',
      company: 'OpenAI',
      description: 'Paid internship, ranging from $17 through $22 per hour. Seeking graduate student in Computer Science with proficiency in Python.',
      link: '#',
    },
    {
      image: 'images/sample-image-landscape.png',
      title: 'Full-Stack Engineer',
      company: 'RevaComm',
      description: '$20.50 per hour, looking for a junior or senior undergraduate student. Experience with php preferred.',
      link: '#',
    },
  ];

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={3}>
          <Sidebar />
        </Col>
        <Col>
          <Row>
            { sampleCompanies.map(({ image, title, company, description, link }, index) => (
              <Col xs={12} md={4} key={index}>
                <Card className="justify-content-center" id="listing-card">
                  <Card.Img id="listing-card-image" variant="top" src={image} />
                  <Card.Title id="listing-card-title">{title}</Card.Title>
                  <Card.Text id="listing-card-text">Company: {company}</Card.Text>
                  <Card.Text id="listing-card-text">{description}</Card.Text>
                  <Card.Link id="listing-card-link" to={link}><Button className="visit-button">More Info</Button></Card.Link>
                </Card>
              </Col>
            )) }
          </Row>
        </Col>
      </Row>
      <HelpButton />
    </Container>
  );
};

export default JobListing;
