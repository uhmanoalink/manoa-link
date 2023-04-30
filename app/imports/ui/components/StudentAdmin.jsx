import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Students } from '../../api/student/Student';
import DeleteConfirmation from './DeleteConfirmation';
import { Images } from '../../api/image/Image';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const StudentAdmin = ({ student }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={Images.getFileUrlFromId(student.profileImageId) ?? ''} width={75} />
      <Card.Title>{student.name.firstName} {student.name.lastName}</Card.Title>
      <Card.Subtitle>{student.email}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Link to={`/edit/${student._id}`}>Edit</Link>
      <DeleteConfirmation collection={Students.collection} document={student} />
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
StudentAdmin.propTypes = {
  student: PropTypes.shape({
    _id: PropTypes.string,
    userId: PropTypes.string,
    name: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    email: PropTypes.string,
    profileImageId: PropTypes.string,
  }).isRequired,
};

export default StudentAdmin;
