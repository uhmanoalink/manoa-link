import { ClientFunction, Selector } from 'testcafe';

class SigninComponent {
  private pageId: string;

  private pageSelector: SelectorAPI;

  constructor() {
    this.pageId = '.signin';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController: TestController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async signin(testController: TestController, username: string, password: string) {
    await this.isDisplayed(testController);
    await testController.typeText('.signin-form-email', username);
    await testController.typeText('.signin-form-password', password);
    await testController.click('.signin-form-submit input.btn.btn-primary');
    await testController.wait(500);
    const getPageUrl = ClientFunction(() => window.location.href);
    const expectedUrl = 'http://localhost:3000/dashboard';
    const currentUrl = await getPageUrl();
    await testController.expect(currentUrl).eql(expectedUrl);
  }
}

export const signinComponent = new SigninComponent();
