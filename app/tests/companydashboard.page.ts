import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class CompanyDashboardPage {
  private pageId: string;

  private pageSelector: Selector;

  constructor() {
    this.pageId = '#company-dashboard';
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

  private async showsCalendar(tc: TestController) {
    await tc.expect(Selector('#calendar').exists).ok();
  }

  private async showsAbout(tc: TestController) {
    await tc.expect(Selector('#about').exists).ok();
  }

  async test(tc: TestController) {
    await navBar.clickNavLink(tc, 'Dashboard');
    await this.isDisplayed(tc);
    await this.showsEvents(tc);
    await this.showsListings(tc);
    await this.showsCalendar(tc);
    await this.showsAbout(tc);
  }
}

export const companyDashboardPage = new CompanyDashboardPage();
