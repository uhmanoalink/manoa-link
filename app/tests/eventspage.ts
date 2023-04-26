import { Selector } from 'testcafe';

class EventsPage {
  private pageId: string;

  private pageSelector: Selector;

  constructor() {
    this.pageId = '#main-events-list';
    this.pageSelector = Selector(this.pageId);
  }

  private async showsEventsAndFilter(tc: TestController) {
    await tc.expect(Selector('#past-event').visible).ok();
    await tc.expect(Selector('#upcoming-event').visible).ok();
    await tc.expect(Selector('#filter-button').visible).ok();
  }

  async test(testController: TestController) {
    await this.showsEventsAndFilter(testController);
  }
}

export const eventsPage = new EventsPage();
