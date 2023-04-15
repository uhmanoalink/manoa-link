import { } from 'testcafe';

import Credentials from './types/CredentialsType';
import { landingPage } from './landing.page';
import { navBar } from './navbar.component';
import { dashboardPage } from './dashboard.page';
import { footerComponent } from './footer.component';

/** Credentials for one of the sample users defined in settings.development.json. */
const userCredentials: Credentials = { username: 'john@foo.com', password: 'changeme' };
const companyCredentials: Credentials = { username: 'company@foo.com', password: 'changeme' };
const adminCredentials: Credentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('ManoaLink localhost test with default db').page('http://localhost:3000');

test('Test landing page', async (testController) => {
  await landingPage.test(testController, userCredentials);
});

test('Test navbar component for students', async (tc: TestController) => {
  await landingPage.test(tc, userCredentials);
  await navBar.checkLoggedInAs(tc, userCredentials.username);
  await navBar.checkStudentNavLinks(tc);
});

test('Test navbar component for companies', async (tc: TestController) => {
  await landingPage.test(tc, companyCredentials);
  await navBar.checkLoggedInAs(tc, companyCredentials.username);
  await navBar.checkCompanyNavLinks(tc);
});

test('Test navbar component for admins', async (tc: TestController) => {
  await landingPage.test(tc, adminCredentials);
  await navBar.checkLoggedInAs(tc, adminCredentials.username);
  await navBar.checkAdminNavLinks(tc);
});

test('Test dashboard page', async (tc) => {
  await landingPage.test(tc, companyCredentials);
  await dashboardPage.test(tc);
});

test('Test footer component', async (testController) => {
  await footerComponent.test(testController);
});
