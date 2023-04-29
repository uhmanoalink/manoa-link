import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Student = ({ student }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{student.firstName} {student.lastName}</Card.Title>
      <Card.Subtitle>{student.major}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{student.address}</Card.Text>
      <Link to={`/edit/${student._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Student.propTypes = {
  student: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    major: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Student;
