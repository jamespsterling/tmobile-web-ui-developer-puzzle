import { $, browser, ExpectedConditions } from 'protractor';

export default {
  suite: async () => {

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();
  }
};