# Manoa Link

### _Connecting company to campus_

Manoa Link allows companies looking to hire prospective student interns to reach student eyes directly. Companies can post job listings and events, which students can view and accept. Students can also follow companies to get notified for new listings or upcoming events.

## Installation

To install this project, follow these steps:

1. Clone the repository to your local machine
2. Install [Meteor](https://docs.meteor.com/install.html)
3. `cd` into the app directory
4. Install dependencies with `meteor npm install`
5. Start the app with `meteor npm start`
6. The app should be running at http://localhost:3000

### During development

If working with Sass, it is advised to run `meteor npm run dev` instead of `meteor npm start`. This makes Sass watch your `.scss` files for changes and automatically recompile, so you don't need to manually restart the app to see them.

## Deployment

Sinec the files required for MeteorUp (`mup.js` and `settings.json`) contain sensitive information, they are stored in GitHub as environment secrets. A deployment action is triggered on pushes to the main branch to automatically deploy the app to DigitalOcean.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

To view the full project page, containing the full-length overview and progress updates, go to https://uhmanoalink.github.io/

For more details regarding the template used, please see http://ics-software-engineering.github.io/meteor-application-template-react/

[![ci-meteor-application-template-react](https://github.com/ics-software-engineering/meteor-application-template-react/actions/workflows/ci.yml/badge.svg)](https://github.com/ics-software-engineering/meteor-application-template-react/actions/workflows/ci.yml)
