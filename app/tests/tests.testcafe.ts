import {} from 'testcafe';

import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { companyListingPage } from './companylisting.page';
import { addEventsPage } from './addevents.page';
import { listEventsPage } from './listevents.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that company listing, add events, and list events are accessible via navbar', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoCompanyListingPage(testController);
  await companyListingPage.isDisplayed(testController);
  await navBar.gotoAddEventsPage(testController);
  await addEventsPage.isDisplayed(testController);
  await navBar.gotoListEventsPage(testController);
  await listEventsPage.isDisplayed(testController);
});
