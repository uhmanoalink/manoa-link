import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { useTracker } from 'meteor/react-meteor-data';
import { Alert, Button, Container, Image, Modal, Row } from 'react-bootstrap';
import { Pencil, PencilSquare } from 'react-bootstrap-icons';
import { AutoForm, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import HelpButton from '../components/HelpButton';
import { Students } from '../../api/student/Student';
import FileUpload from '../components/FileUpload';
import { Images } from '../../api/image/Image';

const nameSchema = new SimpleSchema2Bridge(
  new SimpleSchema({
    firstName: String,
    lastName: String,
  }),
);

const emailSchema = new SimpleSchema2Bridge(
  new SimpleSchema({
    newEmail: String,
  }),
);

const passwordSchema = new SimpleSchema2Bridge(
  new SimpleSchema({
    oldPassword: String,
    newPassword: String,
    repeatPassword: String,
  }),
);

const StudentProfile = () => {
  const [retrack, setRetrack] = useState(false);
  const [updatingPfp, setUpdatingPfp] = useState(false);
  const [updatingName, setUpdatingName] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState();
  const [passwordAlertVariant, setPasswordAlertVariant] = useState('hidden');

  const { ready, student } = useTracker(() => {
    const imagesSub = Meteor.subscribe(Images.allImagesPublication);
    const studentSub = Meteor.subscribe(Students.studentPublicationName);
    const studentDoc = Students.collection.findOne({ userId: Meteor.userId() });

    setRetrack(false);

    return {
      ready: studentSub.ready() && imagesSub.ready(),
      student: studentDoc,
    };
  }, [retrack]);

  const handleClosePfpModal = () => {
    setUpdatingPfp(false);
  };

  const handleSubmitImageUpload = (imageDoc) => {
    Students.updateOne(student._id, { $set: { profileImageId: imageDoc._id } });
    handleClosePfpModal();
    setRetrack(true);
  };

  const handleSubmitEditName = (nameSubmission) => {
    Students.updateOne(student._id, { $set: { name: nameSubmission } });
    setUpdatingName(false);
  };

  const handleSubmitChangeEmail = (emailSubmission) => {
    const { newEmail } = emailSubmission;
    const oldEmail = student.email;
    const userId = Meteor.userId();
    Meteor.call('changeAccountEmail', userId, oldEmail, newEmail);
    Students.updateOne(student._id, { $set: { email: newEmail } });

    setRetrack(true);
  };

  const handleSubmitChangePassword = (passwordSubmission) => {
    const { oldPassword, newPassword, repeatPassword } = passwordSubmission;
    if (newPassword === repeatPassword) {
      Accounts.changePassword(oldPassword, newPassword, (err) => {
        if (err) {
          setPasswordAlert('Failed to change password.');
          setPasswordAlertVariant('danger');
        } else {
          setPasswordAlert('Password changed.');
          setPasswordAlertVariant('info');
        }
      });
    } else {
      setPasswordAlert('Password confirmation does not match.');
      setPasswordAlertVariant('warning');
    }

    setTimeout(() => {
      setPasswordAlert();
      setPasswordAlertVariant('hidden');
    }, (3000));

    setRetrack(true);
  };

  return (
    <Container id="student-profile" className="py-3 justify-content-center">
      {ready && student ? (
        <>
          <Row className="justify-content-center align-items-center">
            <button
              onClick={() => setUpdatingPfp(true)}
              className="change-pfp-button"
              type="button"
            >
              <Image src={Images.getFileUrlFromId(student.profileImageId)} id="pfp" />
              <div className="edit-pfp-icon">
                <Pencil size={24} />
              </div>
            </button>
            <Modal
              size="sm"
              show={updatingPfp}
              onHide={handleClosePfpModal}
              backdropClassName="change-pfp-modal-backdrop"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>New Profile Picture</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FileUpload onUpload={handleSubmitImageUpload} />
              </Modal.Body>
            </Modal>
            <section id="name">
              <h1 className="text-manoa-green">
                {student.name.firstName} {student.name.lastName}
                <Button variant="link" onClick={() => setUpdatingName(!updatingName)}>
                  <PencilSquare size={24} />
                </Button>
              </h1>
              {updatingName ?
                (
                  <AutoForm schema={nameSchema} onSubmit={handleSubmitEditName}>
                    <TextField className="profile-field" name="firstName" label="First name" />
                    <TextField className="profile-field" name="lastName" label="Last name" />
                    <Button
                      type="submit"
                      variant="success"
                      className="mb-3 me-1"
                    >
                      Update name
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      className="mb-3"
                      onClick={() => setUpdatingName(false)}
                    >
                      Close
                    </Button>
                  </AutoForm>
                ) : undefined}
            </section>
            <hr />
            <section id="email" className="mb-5">
              <h4>Email: {Meteor.user().username}</h4>
              <AutoForm schema={emailSchema} onSubmit={handleSubmitChangeEmail}>
                <TextField className="profile-field" name="newEmail" />
                <Button
                  type="submit"
                  variant="success"
                  className="mb-3"
                >
                  Change email
                </Button>
              </AutoForm>
            </section>
            <section id="password" className="mb-5">
              <h4>Change Password:</h4>
              <AutoForm schema={passwordSchema} onSubmit={handleSubmitChangePassword}>
                <TextField className="profile-field" name="oldPassword" type="password" />
                <TextField className="profile-field" name="newPassword" type="password" />
                <TextField className="profile-field" name="repeatPassword" type="password" label="Confirm new password" />
                <Button
                  type="submit"
                  variant="success"
                  className="mb-3"
                >
                  Change password
                </Button>
              </AutoForm>
              <Alert variant={passwordAlertVariant}>{passwordAlert}</Alert>
            </section>
          </Row>
          <HelpButton />
        </>
      ) : undefined}
    </Container>
  );
};

export default StudentProfile;
