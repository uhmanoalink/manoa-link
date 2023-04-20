import { Selector } from 'testcafe';
import { navBar } from './navbar.component';
import Credentials from './types/CredentialsType';
import Role from './types/RoleType';

class SignupPage {
  private pageId: string;

  private pageSelector: Selector;

  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  private async isDisplayed(testController: TestController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signUpAs(tc: TestController, credentials: Credentials, role: Role) {
    await tc.expect(role).notEql('admin');
    await this.isDisplayed(tc);
    await tc.typeText(this.pageSelector.find('input[type="text"][name="email"]'), credentials.username, { replace: true });
    await tc.typeText(this.pageSelector.find('input[type="password"][name="password"]'), credentials.password, { replace: true });
    await tc.click(this.pageSelector.find('select[name="role"]'));
    await tc.click(this.pageSelector.find('select[name="role"]').find('option').withText(role));
    await tc.click(this.pageSelector.find('input[type="submit"]'));
  }

  private async testCreateStudent(tc: TestController) {
    // If the user already exists, it should fail
    await this.signUpAs(tc, { username: 'john@foo.com', password: 'changeme' }, 'student');
    await tc.expect(this.pageSelector.find('div[role="alert"]').withText('Username already exists').visible).ok();
    await navBar.checkUnloggedNavLinks(tc);
    // Create a new student
    const newCreds: Credentials = { username: `student_${Math.floor(Math.random() * 10000 + 10000)}@foo.com`, password: 'changeme' };
    await this.signUpAs(tc, newCreds, 'student');
    await navBar.checkLoggedInAs(tc, newCreds.username);
    // await tc.debug();
    await navBar.checkStudentNavLinks(tc);
  }

  private async testCreateCompany(tc: TestController) {
    // If the user already exists, it should fail
    await this.signUpAs(tc, { username: 'company@foo.com', password: 'changeme' }, 'company');
    await tc.expect(this.pageSelector.find('div[role="alert"]').withText('Username already exists').visible).ok();
    await navBar.checkUnloggedNavLinks(tc);
    // Create a new company
    const newCreds: Credentials = { username: `company_${Math.floor(Math.random() * 10000 + 10000)}@foo.com`, password: 'changeme' };
    await this.signUpAs(tc, newCreds, 'company');
    await navBar.checkLoggedInAs(tc, newCreds.username);
    await navBar.checkCompanyNavLinks(tc);
  }

  async test(tc: TestController) {
    const navbarDropdownExists = await Selector('#navbar-dropdown').exists;
    if (navbarDropdownExists) {
      await navBar.gotoSignUpPage(tc);
    } else {
      await tc.click(Selector('.signin').find('a').withText('Sign Up!'));
    }
    await this.isDisplayed(tc);
    await this.testCreateStudent(tc);
    await navBar.gotoSignUpPage(tc);
    await this.testCreateCompany(tc);
  }
}

export const signupPage = new SignupPage();
