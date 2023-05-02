import { } from 'testcafe';

import Credentials from './types/CredentialsType';
import { landingPage } from './landing.page';
import { navBar } from './navbar.component';
import { companyDashboardPage } from './companydashboard.page';
import { studentDashboardPage } from './studentdashboard.page';
import { footerComponent } from './footer.component';
import { signupPage } from './signup.page';
import { adminDashboardPage } from './admindashboard.page';
import { companyProfilePage } from './companyprofile.page';
import { studentProfilePage } from './studentprofile.page';
import { eventsPage } from './eventspage';

/** Credentials for one of the sample users defined in settings.development.json. */
const studentCredentials: Credentials = { username: 'john@foo.com', password: 'changeme' };
const companyCredentials: Credentials = { username: 'company@foo.com', password: 'changeme' };
const adminCredentials: Credentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('ManoaLink localhost test with default db').page('http://localhost:3000');

// test('Test landing page', async (testController) => {
//   await landingPage.test(testController, studentCredentials);
// });

// test('Test navbar component unlogged user', async (tc:TestController) => {
//   await tc.navigateTo('/signin');
//   await navBar.checkUnloggedNavLinks(tc);
// });

// test('Test navbar component for students', async (tc: TestController) => {
//   await landingPage.test(tc, studentCredentials);
//   await navBar.checkLoggedInAs(tc, studentCredentials.username);
//   await navBar.checkStudentNavLinks(tc);
// });

// test('Test navbar component for companies', async (tc: TestController) => {
//   await landingPage.test(tc, companyCredentials);
//   await navBar.checkLoggedInAs(tc, companyCredentials.username);
//   await navBar.checkCompanyNavLinks(tc);
// });

// test('Test navbar component for admins', async (tc: TestController) => {
//   await landingPage.test(tc, adminCredentials);
//   await navBar.checkLoggedInAs(tc, adminCredentials.username);
//   await navBar.checkAdminNavLinks(tc);
// });

// test('Test company dashboard page', async (tc) => {
//   await landingPage.test(tc, companyCredentials);
//   await companyDashboardPage.test(tc);
// });

// test('Test company profile page', async (tc) => {
//   await landingPage.test(tc, companyCredentials);
//   await tc.navigateTo('/my-profile');
//   await companyProfilePage.test(tc);
// });

// test('Test events page', async (tc) => {
//   await landingPage.test(tc, studentCredentials);
//   await tc.navigateTo('/events');
//   await tc.wait(500);
//   await eventsPage.test(tc);
// });

test('Test student dashboard page', async (tc) => {
  await landingPage.test(tc, studentCredentials);
  await studentDashboardPage.test(tc);
});

// test('Test student profile page', async (tc) => {
//   await landingPage.test(tc, studentCredentials);
//   await tc.navigateTo('/my-profile');
//   await studentProfilePage.test(tc);
// });

// test('Test footer component', async (testController) => {
//   await footerComponent.test(testController);
// });

// test('Test sign up page', async (tc) => {
//   await signupPage.test(tc);
// });

// test('Test admin dashboard page', async (tc) => {
//   await landingPage.test(tc, adminCredentials);
//   await adminDashboardPage.test(tc);
// });
