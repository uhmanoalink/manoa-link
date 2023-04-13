import {} from 'testcafe';

import Credentials from './types/CredentialsType';
import { landingPage } from './landing.page';
import { navBar } from './navbar.component';
import { footerComponent } from './footer.component';

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials: Credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('ManoaLink localhost test with default db').page('http://localhost:3000');

test('Test landing page', async (testController) => {
  await landingPage.test(testController, credentials);
});

test('Test that Navbar links are accessible', async (testController: TestController) => {
  await landingPage.test(testController, credentials);
  await navBar.gotoNavLinkPages(testController);
});

test('Test footer component', async (testController) => {
  await footerComponent.test(testController);
});

test('Should fail', async (tc) => tc.expect(false));
