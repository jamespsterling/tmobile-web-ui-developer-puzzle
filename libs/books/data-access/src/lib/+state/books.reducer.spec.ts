import { initialState, reducer, State } from './books.reducer';
import * as BooksActions from './books.actions';
import { createBook } from '@tmo/shared/testing';

describe('Books Reducer', () => {
  describe('valid Books actions', () => {
    it('searchBooksSuccess should return set the list of known Books', () => {
      const books = [createBook('A'), createBook('B'), createBook('C')];
      const action = BooksActions.searchBooksSuccess({ books });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(3);
    });
  });

  it('searchBooksFailure should return an error', () => {

    const errObj = { error: 'Error searching books' };
    const action = BooksActions.searchBooksFailure(errObj);

    const result: State = reducer(initialState, action);

    expect(result.loaded).toBe(false);
    expect(result.ids.length).toBe(0);
    expect(result.error).toBe(errObj.error);
  });

  it('clearSearch should return an empty set', () => {

    const books = [createBook('A'), createBook('B'), createBook('C')];
    BooksActions.searchBooksSuccess({ books });

    const action = BooksActions.clearSearch();

    const result: State = reducer(initialState, action);

    expect(result.loaded).toBe(false);
    expect(result.ids.length).toBe(0);
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
