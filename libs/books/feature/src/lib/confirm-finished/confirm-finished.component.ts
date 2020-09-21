import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-dialog-confirm-mark-read',
  templateUrl: './confirm-finished.component.html'
})
export class ConfirmFinishedComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmFinishedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReadingListItem
  ) {}
}