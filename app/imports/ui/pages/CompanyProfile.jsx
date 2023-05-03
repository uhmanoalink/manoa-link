import React, { useState } from 'react';
import { Alert, Button, Container, Image, Modal, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { AutoForm, LongTextField, TextField } from 'uniforms-bootstrap5';
import { Pencil, PencilSquare } from 'react-bootstrap-icons';
import HelpButton from '../components/HelpButton';
import { Companies } from '../../api/company/Company';
import { Images } from '../../api/image/Image';
import FileUpload from '../components/FileUpload';

const nameSchema = new SimpleSchema2Bridge(
  new SimpleSchema({
    name: String,
  }),
);

const companyInfoSchema = new SimpleSchema2Bridge(
  new SimpleSchema({
    website: String,
    address: String,
    description: String,
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

const CompanyProfile = () => {
  const [retrack, setRetrack] = useState(false);
  const [updatingPfp, setUpdatingPfp] = useState(false);
  const [updatingName, setUpdatingName] = useState(false);
  const [updatingCompanyInfo, setUpdatingCompanyInfo] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState();
  const [passwordAlertVariant, setPasswordAlertVariant] = useState('hidden');

  const { ready, company } = useTracker(() => {
    const imagesSub = Meteor.subscribe(Images.allImagesPublication);
    const companiesSub = Meteor.subscribe(Companies.companyPublicationName);
    const companyDoc = Companies.collection.findOne({ userId: Meteor.userId() });

    setRetrack(false);

    return {
      ready: companiesSub.ready() && imagesSub.ready(),
      company: companyDoc,
    };
  }, [retrack]);

  const handleClosePfpModal = () => {
    setUpdatingPfp(false);
  };

  const handleSubmitImageUpload = (imageDoc) => {
    Companies.updateOne(company._id, { $set: { imageId: imageDoc._id } });
    handleClosePfpModal();
    setRetrack(true);
  };

  const handleSubmitEditName = (nameSubmission) => {
    const { name } = nameSubmission;
    Companies.updateOne(company._id, { $set: { name } });
    setUpdatingName(false);
  };

  const handleSubmitEditCompanyInfo = (companyInfoSubmission) => {
    const { website, address, description } = companyInfoSubmission;
    Companies.updateOne(company._id, { $set: { website, address, description } });
  };

  const handleSubmitChangeEmail = (emailSubmission) => {
    const { newEmail } = emailSubmission;
    const oldEmail = company.email;
    const userId = Meteor.userId();
    Meteor.call('changeAccountEmail', userId, oldEmail, newEmail);
    Companies.updateOne(company._id, { $set: { email: newEmail } });

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
    <Container id="company-profile" className="py-3 justify-content-center">
      {ready && company ? (
        <>
          <Row className="justify-content-center align-items-center">
            <button
              onClick={() => setUpdatingPfp(true)}
              className="change-pfp-button"
              type="button"
            >
              <Image src={Images.getFileUrlFromId(company.imageId)} id="pfp" />
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
                {company.name}
                <Button variant="link" onClick={() => setUpdatingName(!updatingName)}>
                  <PencilSquare size={24} />
                </Button>
              </h1>
              {updatingName ?
                (
                  <AutoForm schema={nameSchema} onSubmit={handleSubmitEditName}>
                    <TextField className="profile-field" name="name" label="Company name" />
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
            <hr className="mb-5" />
            <section id="company-info" className="mb-5">
              <h3>
                Company Information
                <Button variant="link" onClick={() => setUpdatingCompanyInfo(!updatingCompanyInfo)}>
                  <PencilSquare size={24} />
                </Button>
              </h3>
              <h4 style={{ fontWeight: 'normal' }}>Website: {company.website}</h4>
              <h4 style={{ fontWeight: 'normal' }}>Address: {company.address}</h4>
              <h4 style={{ fontWeight: 'normal' }}>Description: {company.description}</h4>
              {
                updatingCompanyInfo ? (
                  <AutoForm
                    schema={companyInfoSchema}
                    onSubmit={handleSubmitEditCompanyInfo}
                    model={{
                      website: company.website,
                      address: company.address,
                      description: company.description,
                    }}
                  >
                    <TextField name="website" placeholder="https://your-company-website.com" />
                    <TextField name="address" placeholder="2500 Campus Rd, Honolulu, HI 96822" />
                    <LongTextField name="description" placeholder="Write a description about your company." />
                    <Button
                      type="submit"
                      variant="success"
                      className="mb-3 me-1"
                    >
                      Update information
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      className="mb-3"
                      onClick={() => setUpdatingCompanyInfo(false)}
                    >
                      Close
                    </Button>
                  </AutoForm>
                ) : undefined
              }
            </section>
            <hr className="mb-5" />
            <h3>Account Details</h3>
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

export default CompanyProfile;
