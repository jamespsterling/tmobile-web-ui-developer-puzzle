import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, markFinished } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { ConfirmFinishedComponent } from '../confirm-finished/confirm-finished.component';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {

  readingList: ReadingListItem[];
  snackBarDuration = 5000;

  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markFinished(item) {
    this.store.dispatch(markFinished({ item }));
    this.snackBar.open('Book marked as finished.', 'Close', {
      duration: this.snackBarDuration
    });
  }

  confirmMarkFinished(item): void {
    const dialogRef = this.dialog.open(ConfirmFinishedComponent, {
      data: item
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.markFinished(confirmed);
      }
    });
  }
}