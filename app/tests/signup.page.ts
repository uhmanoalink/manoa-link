import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignupPage {
  private pageId: string;
  private pageSelector: Selector;
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController: TestController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController: TestController, username: string, password: string) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-email', username);
    await testController.typeText('#signup-form-password', password);
    await testController.click('#signup-form-submit input.btn.btn-primary');
    await navBar.isLoggedIn(testController, username);
  }
}

export const signupPage = new SignupPage();