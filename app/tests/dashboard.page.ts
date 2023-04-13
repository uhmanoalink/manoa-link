import { Selector } from 'testcafe';

class DashboardPage {
  private pageId: string;

  private pageSelector: Selector;

  constructor() {
    this.pageId = '#dashboard';
    this.pageSelector = Selector(this.pageId);
  }

  private async isDisplayed(tc: TestController) {
    await tc.expect(this.pageSelector.exists).ok();
    await tc.expect(this.pageSelector.visible).ok();
  }

  private async showsEvents(tc: TestController) {
    await tc.expect(Selector('#upcoming-events').exists).ok();
  }

  private async showsListings(tc: TestController) {
    await tc.expect(Selector('#listings').exists).ok();
  }

  async test(tc: TestController) {
    await tc.navigateTo('http://localhost:3000/dashboard');
    await this.isDisplayed(tc);
    await this.showsEvents(tc);
    await this.showsListings(tc);
  }
}

export const dashboardPage = new DashboardPage();