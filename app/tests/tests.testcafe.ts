import {} from 'testcafe';

import { landingPage } from './landing.page';
import Credentials from './types/CredentialsType';

// import { signinPage } from './signin.page';
// import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { dashboardPage } from './dashboard.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const userCredentials: Credentials = { username: 'john@foo.com', password: 'changeme' };
const companyCredentials: Credentials = { username: 'company@foo.com', password: 'changeme' };

fixture('ManoaLink localhost test with default db').page(
  'http://localhost:3000',
);

/*
  Test format:
  test(testName, async (t) => {
    await test1;
    await test2;
  });
*/

test('Test landing page', async (testController) => {
  await landingPage.test(testController, userCredentials);
});

test('Test that Navbar links are accessible', async (testController: TestController) => {
  await landingPage.test(testController, userCredentials);
  await navBar.gotoNavLinkPages(testController);
});

test('Test dashboard page', async (tc) => {
  await landingPage.test(tc, companyCredentials);
  await dashboardPage.test(tc);
});

// test('Test that signin and signout work', async (testController) => {
//   await navBar.gotoSignInPage(testController);
//   await signinPage.signin(testController, credentials.username, credentials.password);
//   await navBar.isLoggedIn(testController, credentials.username);
//   await navBar.logout(testController);
//   await signoutPage.isDisplayed(testController);
// });
