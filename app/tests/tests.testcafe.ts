import {} from 'testcafe';

import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { companyListingPage } from './companylisting.page';
import { addEventsPage } from './addevents.page';
import { listEventsPage } from './listevents.page';
import { navBar } from './navbar.component';
import Credentials from './types/CredentialsType';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials: Credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('ManoaLink localhost test with default db').page(
  'http://localhost:3000'
);

/*
  Test format:
  test(testName, async (t) => {
    await test1;
    await test2;
  });
*/

test('Test landing page', async (testController) => {
  await landingPage.test(testController, credentials);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test navbar', async (testController) => {
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
