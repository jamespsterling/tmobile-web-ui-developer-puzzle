import { $, $$, browser, ExpectedConditions } from 'protractor';
import okreads from '../suites/okreads.suite';
import bookSearch from '../suites/book-search.suite';

describe('When: Use the search feature', () => {
  it('Then: I should be able to search books by title', async () => {
    await okreads.suite();

    await bookSearch.suite('javascript');

    await browser.wait(
      ExpectedConditions.visibilityOf($$('[data-testing="book-item"]').first())
    );
    const items = await $$('[data-testing="book-item"]');
    expect(items.length).toBeGreaterThan(1);
  });

  xit('Then: I should see search results as I am typing', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    // TODO: Implement this test!
  });
});
