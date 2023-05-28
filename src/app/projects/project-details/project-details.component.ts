import { Component, Inject, Optional, OnInit, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  
  local_data: any;
  hideTheViewSite: boolean = false;

  @HostListener('document:keydown.escape') // Close dialog on escape key press
  onKeydownHandler() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
  
  constructor(
    private dialogRef: MatDialogRef<ProjectDetailsComponent>,
    private _dialog: MatDialog,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public projectData: any
  ) {

    this.local_data = {...projectData};
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  navigateToProject(link: string): void {
    window.open(link, '_blank');
  }
}
