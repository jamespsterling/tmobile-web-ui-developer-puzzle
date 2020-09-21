import { $, $$, browser, ExpectedConditions } from 'protractor';
import okreads from '../suites/okreads.suite';
import snackBar from '../suites/snack-bar.suite';
import bookSearch from '../suites/book-search.suite';
import readingList from '../suites/reading-list.suite';

describe('When: I use the reading list feature', () => {

  const waitTimeout = 10000;

  beforeAll(async () => {

    // Seed the reading list with some tasty titles
    await okreads.suite();

    await bookSearch.suite('PHP');

    await browser.wait(
      ExpectedConditions.visibilityOf($$('[data-testing="book-item-want-to-read"]').first())
    );

    const wantButton = await $$('[data-testing="book-item-want-to-read"]').first();
    wantButton.click();
  });

  afterAll(async () => {

    await okreads.suite();

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const removeBooks = await $$('[data-testing="remove-book"]');
    for (const book of removeBooks) {
      book.click();
    }
  });

  it('Then: I should see my reading list', async () => {
    await okreads.suite();
    await readingList.suite();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  }),

  describe('And: I mark a book as finished', () => {
    it('Then: I should see a confirmation and button text change', async () => {

      await okreads.suite();

      await bookSearch.suite('PHP');

      await browser.wait(
        ExpectedConditions.visibilityOf($$('[data-testing="book-item-want-to-read"]').first())
      );

      await readingList.suite();
      await browser.wait(
        ExpectedConditions.textToBePresentInElement(
          $('[data-testing="reading-list-container"]'),
          'My Reading List'
        )
      );

      const markFinished = await $$('[data-testing="mark-finished"]').first();
      markFinished.click();

      await browser.wait(
        ExpectedConditions.textToBePresentInElement(
          $('tmo-dialog-confirm-mark-read'),
          'Confirm'
        )
      );

      const confirmFinished = await $('[data-testing="confirm-mark-finished"]');
      confirmFinished.click();

      await snackBar.suite($('.mat-simple-snackbar'), waitTimeout, 'Book marked as finished.');

      await browser.wait(
        ExpectedConditions.textToBePresentInElement(
          $('[data-testing="book-finished-date"]'),
          'Finished'
        )
      );
    });
  })
});
