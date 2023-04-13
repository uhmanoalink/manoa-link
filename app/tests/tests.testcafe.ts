import {} from 'testcafe';

import Credentials from './types/CredentialsType';
import { landingPage } from './landing.page';
import { navBar } from './navbar.component';
import { dashboardPage } from './dashboard.page';
import { footerComponent } from './footer.component';

/** Credentials for one of the sample users defined in settings.development.json. */
const userCredentials: Credentials = { username: 'john@foo.com', password: 'changeme' };
const companyCredentials: Credentials = { username: 'company@foo.com', password: 'changeme' };

fixture('ManoaLink localhost test with default db').page('http://localhost:3000');

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

test('Test footer component', async (testController) => {
  await footerComponent.test(testController);
});
