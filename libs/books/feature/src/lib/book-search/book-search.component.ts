import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import {
  ReadingListBook,
  addToReadingList,
  removeFromReadingList,
  clearSearch,
  searchBooks,
  getAllBooks,
  getBooksError,
  getReadingList
} from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';

export enum SnackType {
  Add = 'Add',
  Remove = 'Remove',
}

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  books: ReadingListBook[];
  loading = true;
  snackBarDuration = 5000;

  searchForm = this.fb.group({
    term: ''
  });

  error = this.store.select(getBooksError);

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
      this.loading = false;
    });
    this.store.select(getBooksError).subscribe((err) => {
      if (err) {
        this.loading = false
      }
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    this.openSnackBar('Book added to reading list.', 'Undo', SnackType.Add, book);
  }

  removeFromReadingList(book: Book, item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackBar('Book removed from reading list.', 'Undo', SnackType.Remove, book);
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.loading = true;
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  resetSearch() {
    this.searchForm.controls.term.setValue('');
    this.store.dispatch(clearSearch());
  }

  openSnackBar(message: string, action: string, type: SnackType, book: Book) {

    this.snackBar.open(message, action, {
      duration: this.snackBarDuration
    }).onAction().subscribe(() => {
      this.store.select(getReadingList).pipe(
        take(1)
      ).subscribe((list: ReadingListItem[]) => {
        if (type === SnackType.Add) {
          this.removeFromReadingList(book, list[list.length - 1]);
        }
        if (type === SnackType.Remove) {
          this.addBookToReadingList(book);
        }
      })
    });
  }
}
