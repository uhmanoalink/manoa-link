import { Selector } from 'testcafe';

class NavBar {

  private pageId: string;

  private pageSelector: SelectorAPI;

  constructor() {
    this.pageId = '#navbar';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController: TestController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** If someone is logged in, then log them out, otherwise do nothing. */
  private async ensureLogout(testController: TestController) {
    const loggedInUser = await Selector('#navbar-dropdown img[alt="pfp"]').getAttribute('aria-details');
    if (loggedInUser) {
      await this.openNavDropdown(testController);
      await testController.click('a[href="/signout"]');
    }
  }

  private async openNavDropdown(tc: TestController) {
    const expanded = await Selector('#navbar-dropdown').getAttribute('aria-expanded') === 'true';
    if (!expanded) {
      await tc.click('#navbar-dropdown');
    }
  }

  private async checkNavLinkExists(tc: TestController, linkText: string) {
    await tc.expect(Selector('#navbar .nav-link').withText(linkText.toUpperCase()).visible).ok();
  }

  private async checkDropdownItemExists(tc: TestController, itemText: string) {
    await this.openNavDropdown(tc);
    await tc.expect(Selector('#navbar .dropdown-item').withText(itemText.toUpperCase()).visible).ok();
  }

  async clickNavLink(tc: TestController, linkText: string) {
    await tc.click((Selector('#navbar .nav-link').withText(linkText.toUpperCase())));
  }

  async gotoSignInPage(testController: TestController) {
    await this.ensureLogout(testController);
    await this.openNavDropdown(testController);
    await testController.click('a[href="/signin"]');
  }

  async gotoSignUpPage(testController: TestController) {
    await this.ensureLogout(testController);
    await this.openNavDropdown(testController);
    await testController.click('a[href="/signup"]');
  }

  async checkStudentNavLinks(tc: TestController) {
    await this.checkNavLinkExists(tc, 'Dashboard');
    await this.checkNavLinkExists(tc, 'Job Listings');
    await this.checkNavLinkExists(tc, 'Events Board');
    await this.openNavDropdown(tc);
    await this.checkDropdownItemExists(tc, 'Profile');
    await this.checkDropdownItemExists(tc, 'Sign Out');
  }

  async checkCompanyNavLinks(tc: TestController) {
    await this.checkNavLinkExists(tc, 'Dashboard');
    await this.checkNavLinkExists(tc, 'Manage Listings');
    await this.checkNavLinkExists(tc, 'Manage Events');
    await this.openNavDropdown(tc);
    await this.checkDropdownItemExists(tc, 'Profile');
    await this.checkDropdownItemExists(tc, 'Sign Out');
  }

  async checkAdminNavLinks(tc: TestController) {
    await this.checkNavLinkExists(tc, 'Dashboard');
    await this.openNavDropdown(tc);
    await this.checkDropdownItemExists(tc, 'Sign Out');
  }

  async checkUnloggedNavLinks(tc: TestController) {
    const navLinkCount = await Selector('#navbar .nav-link').count;
    await tc.expect(navLinkCount).eql(1);
    await this.openNavDropdown(tc);
  }

  /** Check that the specified user is currently logged in. */
  async checkLoggedInAs(testController: TestController, username: string) {
    const loggedInUser = await Selector('#navbar-dropdown img[alt="pfp"]').getAttribute('aria-details');
    await testController.expect(loggedInUser).eql(username);
  }

  /** Logout current user. */
  async logout(testController: TestController) {
    if (await Selector('#navbar-dropdown .img[alt="pfp"]').exists) {
      await this.openNavDropdown(testController);
      await testController.click(Selector('.dropdown-item').withText('Sign Out'));
    }
  }
}

export const navBar = new NavBar();
