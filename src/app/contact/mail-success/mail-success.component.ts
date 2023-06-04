import { Component, HostListener, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mail-success',
  templateUrl: './mail-success.component.html',
  styleUrls: ['./mail-success.component.scss']
})
export class MailSuccessComponent implements OnInit {

  local_data: any;

  @HostListener('document:keydown.escape') // Close dialog on escape key press
  onKeydownHandler() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
  constructor(
    private dialogRef: MatDialogRef<MailSuccessComponent>,
    private _dialog: MatDialog,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public mailSuccessData: any
  ) { 

    this.local_data = {...mailSuccessData};
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
