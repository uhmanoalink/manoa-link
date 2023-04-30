import React from 'react';
import { Card, Container, Col, Row } from 'react-bootstrap';
import HelpButton from '../components/HelpButton';
import Sidebar from '../components/Sidebar';

const CompanyListing = () => {

  const sampleCompanies = [
    {
      imageId: 'images/sample-image-landscape.png',
      name: 'RevaComm',
      description: 'A mission-driven digital transformation firm focused on Agile DevSecOps practices that deliver scale, speed, and security for government agencies and enterprises facing continually evolving IT needs and cyber security threats.',
      website: '#',
    },
    {
      imageId: 'images/sample-image-landscape.png',
      name: 'NASA',
      description: 'NASA explores the unknown in air and space, innovates for the benefit of humanity, and inspires the world through discovery.',
      website: '#',
    },
    {
      imageId: 'images/sample-image-landscape.png',
      name: 'ISEC',
      description: 'The mission of ISEC Conferences is to enhance communication and understanding between structural, system, and construction engineers, for successful design and construction of engineering projects.',
      website: '#',
    },
    {
      imageId: 'images/sample-image-landscape.png',
      name: 'OpenAI',
      description: 'ChatGPT is a state-of-the-art language model developed by OpenAI, capable of providing personalized and intelligent responses to a wide range of queries and conversations.',
      website: '#',
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
            { sampleCompanies.map(({ imageId, name, description, website }, index) => (
              <Col xs={12} md={4} key={index}>
                <Card className="justify-content-center" id="listing-card">
                  <Card.Img id="listing-card-image" variant="top" src={imageId} />
                  <Card.Title id="listing-card-title">{name}</Card.Title>
                  <Card.Text id="listing-card-text">{description}</Card.Text>
                  <Card.Link id="listing-card-link" to={website}><button type="submit" className="visit-button">Visit</button></Card.Link>
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
