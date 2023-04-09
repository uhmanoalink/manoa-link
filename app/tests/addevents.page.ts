import { Selector } from 'testcafe';

class AddEventsPage {
  private pageId: string;
  private pageSelector: Selector;
  constructor() {
    this.pageId = '#add-events-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController: TestController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const addEventsPage = new AddEventsPage();
