import { Selector } from 'testcafe';
import { signinComponent } from './signin.component';
import Credentials from './types/CredentialsType';

class LandingPage {
  private pageId: string;

  private pageSelector: Selector;

  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  private async isDisplayed(testController: TestController) {
    await testController.expect(this.pageSelector.exists).ok();
    await testController.expect(this.pageSelector.visible).ok();
  }

  private async checkSections(tc: TestController) {
    await tc.expect(Selector('section#tagline').visible).ok();
    await tc.expect(Selector('section#reasons-to-join').visible).ok();
    await tc.expect(Selector('section#interface-features').visible).ok();
  }

  private async hasSignIn(testController: TestController, credentials: Credentials) {
    await signinComponent.isDisplayed(testController);
    await signinComponent.signin(testController, credentials.username, credentials.password);
  }

  async test(testController: TestController, credentials: Credentials) {
    await this.isDisplayed(testController);
    await this.checkSections(testController);
    await this.hasSignIn(testController, credentials);
  }
}

export const landingPage = new LandingPage();
