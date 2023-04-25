import { Selector } from 'testcafe';

class CompanyProfilePage {
  private pageId: string;

  private pageSelector: Selector;

  constructor() {
    this.pageId = '#company-profile';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  private async isDisplayed(testController: TestController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.expect(this.pageSelector.exists).ok();
    await testController.expect(this.pageSelector.visible).ok();
  }

  async test(testController: TestController) {
    await this.isDisplayed(testController);
  }
}

export const companyProfilePage = new CompanyProfilePage();
