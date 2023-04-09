import { Selector } from 'testcafe';

class LandingPage {
  private pageId: string;
  private pageSelector: Selector;

  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController: TestController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
    await testController.expect(this.pageSelector.visible).ok();
  }
}

export const landingPage = new LandingPage();