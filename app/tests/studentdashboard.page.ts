import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class StudentDashboardPage {
  private pageId: string;

  private pageSelector: Selector;

  constructor() {
    this.pageId = '#student-dashboard';
    this.pageSelector = Selector(this.pageId);
  }

  private async isDisplayed(tc: TestController) {
    await tc.expect(this.pageSelector.exists).ok();
    await tc.expect(this.pageSelector.visible).ok();
  }

  private async showsFeed(tc: TestController) {
    await tc.expect(Selector('#feed').visible).ok();
    await tc.click(Selector('.feed-button').withText('Upcoming Events'));
    await tc.expect(Selector('.events-feed').visible).ok();
    await tc.click(Selector('.feed-button').withText('Saved Jobs'));
    await tc.expect(Selector('.jobs-feed').visible).ok();
  }

  private async showsInterestingCompanies(tc: TestController) {
    await tc.expect(Selector('#interesting-companies').visible).ok();
    await tc.expect(Selector('#interesting-companies .companies').visible).ok();
  }

  async test(tc: TestController) {
    await navBar.clickNavLink(tc, 'Dashboard');
    await this.isDisplayed(tc);
    await this.showsFeed(tc);
    await this.showsInterestingCompanies(tc);
  }
}

export const studentDashboardPage = new StudentDashboardPage();
