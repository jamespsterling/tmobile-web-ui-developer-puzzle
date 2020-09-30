import { browser, ExpectedConditions } from 'protractor';

export default {
  suite: async (element, timeout, message) => {

    // Necessary to deal with promise/timeout for snackbar duration
    browser.waitForAngularEnabled(false);

    await browser.wait(
      ExpectedConditions.visibilityOf(element),
      timeout,
      message
    );
  }
};
