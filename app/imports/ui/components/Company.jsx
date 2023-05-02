import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, ButtonToolbar, Card } from 'react-bootstrap';
import { Images } from '../../api/image/Image';
import { studentFollowsCompany, studentUnfollowsCompany } from '../../../lib/relationships';
import { Students } from '../../api/student/Student';

const defaultImage = 'images/sample-image-landscape.png';
const Company = ({ company }) => {
  const { ready, student } = useTracker(() => {
    const sub = Meteor.subscribe(Students.studentPublicationName);
    return {
      ready: sub.ready(),
      student: Students.collection.findOne({ userId: Meteor.userId() }),
    };
  }, []);

  const onVisit = () => {
    window.open(company.website, '_blank');
  };

  const onFollow = () => {
    if (ready) {
      const studentId = student._id;
      const companyId = company._id;
      studentFollowsCompany(studentId, companyId);
    }
  };

  const onUnfollow = () => {
    if (ready) {
      const studentId = student._id;
      const companyId = company._id;
      studentUnfollowsCompany(studentId, companyId);
    }
  };

  return (
    <div className="company-listing">
      <Card>
        <Card.Img variant="top" src={(company.imageId === 'noId') ? defaultImage : Images.getFileUrlFromId(company.imageId)} />
        <Card.Title>{company.name}</Card.Title>
        <div className="card-text-wrapper">
          <div className="card-text-fade" />
          <Card.Text>{company.description}</Card.Text>
        </div>
        <ButtonToolbar>
          <Button variant="success" onClick={onVisit} className="me-2">Visit</Button>
          {student.followedCompanies.includes(company._id)
            ? <Button variant="danger" onClick={onUnfollow}>Unfollow</Button>
            : <Button variant="success" onClick={onFollow}>Follow</Button>}
        </ButtonToolbar>
      </Card>
    </div>
  );
};

// Require a document to be passed to this component.
Company.propTypes = {
  company: PropTypes.shape({
    _id: PropTypes.string,
    userId: PropTypes.string,
    name: PropTypes.string,
    imageId: PropTypes.string,
    website: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Company;
