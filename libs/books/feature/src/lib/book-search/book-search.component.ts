import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  getBooksError
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  books: ReadingListBook[];
  loading = true;

  searchForm = this.fb.group({
    term: ''
  });

  error = this.store.select(getBooksError);

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
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

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((e: any) => {
          if (e.key === 'Enter' || e.key === 'Meta') {
            return false;
          }
          return true;
        }),
        debounceTime(500)
      )
      .subscribe((validKey) => {
        if (validKey) {
          this.searchBooks();
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
}
