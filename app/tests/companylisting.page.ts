import { Selector } from 'testcafe';

class CompanyListingPage {
  private pageId: string;
  private pageSelector: Selector;
  constructor() {
    this.pageId = '#company-listing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController: TestController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const companyListingPage = new CompanyListingPage();
