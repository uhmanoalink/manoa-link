import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Events } from '../../api/event/Event';

const bridge = new SimpleSchema2Bridge(Events.schema);

/* Renders the EditEvent page for editing a single document. */
const EditEvent = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditEvent', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(Events.adminPublicationName);
    const subscription2 = Meteor.subscribe(Events.companyPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the document
    const event = Events.collection.findOne(_id);
    return {
      doc: event,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditEvent', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { eventName, address, description, tag, companyId, createdAt } = data;
    Events.collection.update(_id, { $set: { eventName, address, description, tag, companyId, createdAt } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Event</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="eventName" /></Col>
                  <SelectField name="tag" multiple/>
                </Row>
                <Row>
                  <Col><TextField name="address" /></Col>
                </Row>
                <LongTextField name="description" />
                <SubmitField />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditEvent;
