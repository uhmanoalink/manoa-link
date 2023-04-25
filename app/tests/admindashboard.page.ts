import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class AdminDashboardPage {
  private pageId: string;

  private pageSelector: Selector;

  constructor() {
    this.pageId = '#admin-dashboard';
    this.pageSelector = Selector(this.pageId);
  }

  private async isDisplayed(tc: TestController) {
    await tc.expect(this.pageSelector.exists).ok();
    await tc.expect(this.pageSelector.visible).ok();
  }

  private async checkSections(tc: TestController) {
    await tc.expect(Selector('#students').exists).ok();
    await tc.expect(Selector('#companies').exists).ok();
    await tc.expect(Selector('#events').exists).ok();
    await tc.expect(Selector('#listings').exists).ok();
  }

  async test(tc: TestController) {
    await navBar.clickNavLink(tc, 'Dashboard');
    await this.isDisplayed(tc);
    await this.checkSections(tc);
  }
}

export const adminDashboardPage = new AdminDashboardPage();
