import React from 'react';
import { Container, Image, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import HelpButton from '../components/HelpButton';

const CompanyProfile = () => {
  const { currentUser } = useTracker(
    () => ({
      currentUser: Meteor.user() ? Meteor.user().username : '',
    }),
    [],
  );

  const sampleProfile = {
    companyName: 'UH Manoa',
    companyPage: 'https://www.ics.hawaii.edu/',
    address: '2500 Campus Rd, Honolulu, HI 96822',
    description: 'The University of Hawaiʻi at Mānoa is a public land-grant research university in Mānoa, a neighborhood of Honolulu, Hawaii. It is the flagship campus of the University of Hawaiʻi system and houses the main offices of the system.',
    image: '/images/sample-pfp.png',
    tags: '',
    owner: '',
    _id: '0',
  };

  return (
    <Container id="company-profile" className="py-3 justify-content-center">
      <Row className="justify-content-center align-items-center">
        <Image src={sampleProfile.image} id="pfp" />
        <h1 className="text-manoa-green">{ sampleProfile.companyName }</h1>
        <p>{sampleProfile.description}</p>
      </Row>
      <HelpButton />
    </Container>
  );
};

export default CompanyProfile;
