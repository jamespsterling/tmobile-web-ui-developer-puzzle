import { $, browser, ExpectedConditions } from 'protractor';

export default {
  suite: async () => {

    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );
  }
};