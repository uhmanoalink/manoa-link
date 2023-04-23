import { ClientFunction, Selector } from 'testcafe';

class FooterComponent {
  private pageId: string;

  private pageSelector: Selector;

  constructor() {
    this.pageId = 'footer';
    this.pageSelector = Selector(this.pageId);
  }

  private async isDisplayed(testController: TestController) {
    await testController.expect(this.pageSelector.exists).ok();
    await testController.expect(this.pageSelector.visible).ok();
  }

  private async testLinks(testController: TestController) {
    await this.checkUrl(testController, 'Blog', 'https://uhmanoalink.github.io');
    await this.checkUrl(testController, 'About Us', 'https://uhmanoalink.github.io/about-us');
    await this.checkUrl(testController, 'FAQ', 'https://uhmanoalink.github.io/faq');

    await this.checkUrl(testController, 'Register Now', 'http://localhost:3000/register');
    await this.checkUrl(testController, 'Dashboard', 'http://localhost:3000/dashboard');
    await this.checkUrl(testController, 'Your Profile', 'http://localhost:3000/profile');
    await this.checkUrl(testController, 'Help', 'http://localhost:3000/help');
  }

  private async checkUrl(testController: TestController, toClick: string, expected: string) {
    await testController.click(toClick);
    await testController.wait(500);
    const getPageUrl = ClientFunction(() => window.location.href);
    const currentUrl = await getPageUrl();
    await testController.expect(currentUrl).eql(expected);
    await testController.navigateTo('http://localhost:3000');
  }

  async test(tc: TestController) {
    this.isDisplayed(tc);
    this.testLinks(tc);
  }
}

export const footerComponent = new FooterComponent();
