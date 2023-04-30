import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import HelpButton from '../components/HelpButton';
import Sidebar from '../components/Sidebar';
import { Companies } from '../../api/company/Company';
import LoadingSpinner from '../components/LoadingSpinner';
import Company from '../components/Company';

const CompanyListing = () => {
  const { ready, companies } = useTracker(() => {
    const subscription = Meteor.subscribe(Companies.studentPublicationName);
    const rdy = subscription.ready();
    const allCompanies = Companies.collection.find({}).fetch();
    return {
      ready: rdy,
      companies: allCompanies,
    };
  });

  return (
    <Container id="listing" className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={3}>
          <Sidebar />
        </Col>
        <Col>
          <Row>
            { ready ? (companies.map((company, id) => (
              <Company company={company} key={id} />
            ))) : (<LoadingSpinner />)}
          </Row>
        </Col>
      </Row>
      <HelpButton />
    </Container>
  );
};

export default CompanyListing;
