import { Selector, ClientFunction } from 'testcafe';
import { navBar } from './navbar.component';
import Credentials from './types/CredentialsType';
import Role from './types/RoleType';
import RegisterCompanyInputData, { isRegisterCompanyInputData } from './types/RegisterCompanyInputDataType';
import RegisterStudentInputData, { isRegisterStudentInputData } from './types/RegisterStudentInputDataType';

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

  /** @returns true if it was successful, false if not */
  private async fillInFirstPage(tc: TestController, credentials: Credentials, role: Role) {
    await tc.typeText(this.pageSelector.find('input[type="text"][name="email"]'), credentials.username, { replace: true });
    await tc.typeText(this.pageSelector.find('input[type="password"][name="password"]'), credentials.password, { replace: true });
    await tc.click(this.pageSelector.find('select[name="role"]'));
    await tc.click(this.pageSelector.find('select[name="role"]').find('option').withText(role));
    await tc.click(this.pageSelector.find('button[type="submit"]'));
    if (await Selector('#registration-error').visible) {
      return false;
    }
    return true;
  }

  /** @returns true if it was successful, false if not */
  private async fillInSecondPage(tc: TestController, role: Role, inputData: RegisterCompanyInputData | RegisterStudentInputData) {
    if (role === 'student' && isRegisterStudentInputData(inputData)) {
      Object.keys(inputData).forEach(async (key) => {
        const inputField = this.pageSelector.find(`input[type="text"][name="${key}"]`);
        await tc.typeText(inputField, inputData[key as keyof RegisterStudentInputData], { replace: true });
      });
    } else if (role === 'company' && isRegisterCompanyInputData(inputData)) {
      Object.keys(inputData).forEach(async (key) => {
        if (key === 'description') {
          const inputField = this.pageSelector.find(`textarea[name="${key}"]`);
          await tc.typeText(inputField, inputData[key as keyof RegisterCompanyInputData], { replace: true });
          return;
        }
        const inputField = this.pageSelector.find(`input[type="text"][name="${key}"]`);
        await tc.typeText(inputField, inputData[key as keyof RegisterCompanyInputData], { replace: true });
      });
    }
    await tc.click(this.pageSelector.find('button[type="submit"]'));
    await tc.wait(500);
    const location = await ClientFunction(() => window.location.pathname)();
    return location === '/dashboard';
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signUpAs(tc: TestController, credentials: Credentials, role: Role, inputData: RegisterCompanyInputData | RegisterStudentInputData) {
    await tc.expect(role).notEql('admin');
    await this.isDisplayed(tc);
    const success = await this.fillInFirstPage(tc, credentials, role);
    if (success) {
      await this.fillInSecondPage(tc, role, inputData);
    }
  }

  private async testCreateStudent(tc: TestController) {
    // If the user already exists, it should fail
    await this.signUpAs(tc, { username: 'john@foo.com', password: 'changeme' }, 'student', {
      firstName: 'Should',
      lastName: 'Fail',
    });
    await tc.expect(this.pageSelector.find('div[role="alert"]').withText('That email is already taken!').visible).ok();
    await navBar.checkUnloggedNavLinks(tc);
    // Create a new student
    await ClientFunction(() => window.location.reload())();
    const newCreds: Credentials = { username: `student_${Math.floor(Math.random() * 10000 + 10000)}@foo.com`, password: 'changeme' };
    await this.signUpAs(tc, newCreds, 'student', {
      firstName: 'New',
      lastName: 'User',
    });
    await navBar.checkLoggedInAs(tc, newCreds.username);
    await navBar.checkStudentNavLinks(tc);
  }

  private async testCreateCompany(tc: TestController) {
    // If the user already exists, it should fail
    await this.signUpAs(tc, { username: 'company@foo.com', password: 'changeme' }, 'company', {
      companyName: 'This',
      website: 'Should',
      address: 'Also',
      description: 'Fail',
    });
    await tc.expect(this.pageSelector.find('div[role="alert"]').withText('That email is already taken!').visible).ok();
    await navBar.checkUnloggedNavLinks(tc);
    // Create a new company
    await ClientFunction(() => window.location.reload())();
    const newCreds: Credentials = { username: `company_${Math.floor(Math.random() * 10000 + 10000)}@foo.com`, password: 'changeme' };
    await this.signUpAs(tc, newCreds, 'company', {
      companyName: 'New Company',
      website: 'newcompany.com',
      address: 'New, Company 12345',
      description: 'This is a new company',
    });
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
