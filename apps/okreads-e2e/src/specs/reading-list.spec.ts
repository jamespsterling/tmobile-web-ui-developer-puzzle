import { $, $$, browser, ExpectedConditions } from 'protractor';
import okreads from '../suites/okreads.suite';
import snackBar from '../suites/snack-bar.suite';
import bookSearch from '../suites/book-search.suite';

describe('When: I use the reading list feature', () => {

  const waitTimeout = 10000;

  afterAll(async () => {

    // This should probably be done with global teardown using NgRX store

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

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  }),

  describe('And: I add a book to the reading list', () => {
    it('Then: I should see a confirmation', async () => {

      await okreads.suite();

      await bookSearch.suite('coffeescript');

      await browser.wait(
        ExpectedConditions.visibilityOf($$('[data-testing="book-item-want-to-read"]').first())
      );
      const wantButton = await $$('[data-testing="book-item-want-to-read"]').first();
      wantButton.click();

      await snackBar.suite($('.mat-simple-snackbar'), waitTimeout, 'Book added to reading list.');
    });
  }),

  describe('If: I add a book to the reading list and made a mistake', () => {
    it('Then: I should select undo from the confirmation to remove the book from the list', async () => {

      await okreads.suite();

      await browser.wait(
        ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
      );

      await bookSearch.suite('ES6');

      await browser.wait(
        ExpectedConditions.visibilityOf($$('[data-testing="book-item-want-to-read"]').first())
      );
      const wantButton = await $$('[data-testing="book-item-want-to-read"]').first();
      wantButton.click();

      await snackBar.suite($('.mat-simple-snackbar'), waitTimeout, 'Book added to reading list.');

      const undoButton = await $('.mat-simple-snackbar .mat-button');
      undoButton.click();

      await snackBar.suite($('.mat-simple-snackbar'), waitTimeout, 'Book removed from reading list.');
    });
  }),

  describe('If: I add a book to the reading list and accidentally select undo', () => {
    it('Then: I should select undo from the removal confirmation to put the book back to the list', async () => {

      await okreads.suite();

      await bookSearch.suite('ClojureScript');

      await browser.wait(
        ExpectedConditions.visibilityOf($$('[data-testing="book-item-want-to-read"]').first())
      );
      const wantButton = await $$('[data-testing="book-item-want-to-read"]').first();
      wantButton.click();

      await snackBar.suite($('.mat-simple-snackbar'), waitTimeout, 'Book added to reading list.');

      const undoButton = await $('.mat-simple-snackbar .mat-button');
      undoButton.click();

      await snackBar.suite($('.mat-simple-snackbar'), waitTimeout, 'Book removed from reading list.');

      const redoButton = await $('.mat-simple-snackbar .mat-button');
      redoButton.click();

      await snackBar.suite($('.mat-simple-snackbar'), waitTimeout, 'Book added to reading list.');
    });
  });

});