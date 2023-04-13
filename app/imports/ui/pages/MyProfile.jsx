import React from 'react';
import { Container, Image, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

const MyProfile = () => {
  const { currentUser } = useTracker(
    () => ({
      currentUser: Meteor.user() ? Meteor.user().username : '',
    }),
    [],
  );

  const sampleProfile = {
    name: 'John Foo',
    description: 'I am a student at the University of Hawaii at Manoa, studying mechanical engineering. I plan to graduate in Spring 2026',
    workExperiences: [
      {
        title: 'Architect',
        company: 'Undefined',
        jobDescription: 'Designed homes for residents in Liliha. Organized teams and monitored material management',
        skills: [
          'Architecture',
          'Design',
          'Product Management',
        ],
      },
      {
        title: 'Waiter',
        company: 'The Spaghetti Factory',
        jobDescription: 'Interacted with customers, sent orders between chefs and consumers.',
        skills: [
          'Customer Interaction',
          'English',
          'Italian',
        ],
      },
    ],
  };
  return (
    <Container id="profile-main" className="py-3 justify-content-center">
      <Row className="justify-content-center align-items-center">
        <Image src="images/sample-pfp.png" width="200px" />
        <p>{ currentUser }</p>
        <h1 id="manoa-green">{ sampleProfile.name }</h1>
        <h2>About Me</h2>
        <p>{ sampleProfile.description }</p>
        <hr />
        {sampleProfile.workExperiences.map(({ title, company, jobDescription, skills }) => (
          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h2 style={{ marginTop: '0' }}>Work Experience</h2>
            <p><strong>Job Title:</strong> {title}</p>
            <p><strong>Company:</strong> {company}</p>
            <p><strong>Job Description:</strong> {jobDescription}</p>
            <p><strong>Skills:</strong></p>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default MyProfile;
