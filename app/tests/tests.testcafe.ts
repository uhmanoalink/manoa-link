import {} from 'testcafe';

import { landingPage } from './landing.page';
// import { signinPage } from './signin.page';
// import { signoutPage } from './signout.page';
// import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

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

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Should pass', async (t) => {
  t.expect(1===1);
});

// test('Test that signin and signout work', async (testController) => {
//   await navBar.gotoSignInPage(testController);
//   await signinPage.signin(testController, credentials.username, credentials.password);
//   await navBar.isLoggedIn(testController, credentials.username);
//   await navBar.logout(testController);
//   await signoutPage.isDisplayed(testController);
// });
