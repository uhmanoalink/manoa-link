import React from 'react';
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
import HelpButton from '../components/HelpButton';
import Sidebar from '../components/Sidebar';

const CompanyListing = () => {

  const sampleCompanies = [
    {
      image: 'images/sample-image-landscape.png',
      name: 'RevaComm',
      description: 'A mission-driven digital transformation firm focused on Agile DevSecOps practices that deliver scale, speed, and security for government agencies and enterprises facing continually evolving IT needs and cyber security threats.',
      link: '#',
    },
    {
      image: 'images/sample-image-landscape.png',
      name: 'NASA',
      description: 'NASA explores the unknown in air and space, innovates for the benefit of humanity, and inspires the world through discovery.',
      link: '#',
    },
    {
      image: 'images/sample-image-landscape.png',
      name: 'ISEC',
      description: 'The mission of ISEC Conferences is to enhance communication and understanding between structural, system, and construction engineers, for successful design and construction of engineering projects.',
      link: '#',
    },
    {
      image: 'images/sample-image-landscape.png',
      name: 'OpenAI',
      description: 'ChatGPT is a state-of-the-art language model developed by OpenAI, capable of providing personalized and intelligent responses to a wide range of queries and conversations.',
      link: '#',
    },
    {
      image: 'images/sample-image-landscape.png',
      name: 'Sample',
      description: 'Sample-text',
      link: '#',
    },
    {
      image: 'images/sample-image-landscape.png',
      name: 'Sample-2',
      description: 'Sample-text-2',
      link: '#',
    },
  ];

  return (
    <Container id="listing" className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={3}>
          <Sidebar />
        </Col>
        <Col>
          <Row>
            { sampleCompanies.map(({ image, name, description, link }, index) => (
              <Col xs={12} md={4} key={index}>
                <Card className="justify-content-center" id="listing-card">
                  <Card.Img id="listing-card-image" variant="top" src={image} />
                  <Card.Title id="listing-card-title">{name}</Card.Title>
                  <Card.Text id="listing-card-text">{description}</Card.Text>
                  <Card.Link id="listing-card-link" to={link}><Button className="visit-button">Visit</Button></Card.Link>
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

/*
  const submit = (data) => {
    const { eventName, address, image, description, companyId = Companies.companyPublicationName, createdAt = new Date() } = data;
    const tags = selectedTags.map(tag => tag.value);
    Events.collection.update(_id, { $set: { eventName, address, image, description, tags, companyId, createdAt } }, (error) => (error ?
    swal('Error', error.message, 'error') :
    swal('Success', 'Item updated successfully', 'success')));
  };
 */

export default CompanyListing;
