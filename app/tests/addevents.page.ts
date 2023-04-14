import { Selector } from 'testcafe';
import { signinComponent } from './signin.component';
import Credentials from './types/CredentialsType';

class AddEventsPage {
  private pageId: string;

  private pageSelector: Selector;

  constructor() {
    this.pageId = '#add-events-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  private async isDisplayed(testController: TestController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
    await testController.expect(this.pageSelector.visible).ok();
  }

  private async hasSignIn(testController: TestController, credentials: Credentials) {
    await signinComponent.isDisplayed(testController);
    await signinComponent.signin(testController, credentials.username, credentials.password);
  }

  async test(testController: TestController, credentials: Credentials) {
    await this.isDisplayed(testController);
    await this.hasSignIn(testController, credentials);
  }
}

export const addEventsPage = new AddEventsPage();
