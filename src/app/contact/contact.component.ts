import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MailSuccessComponent } from './mail-success/mail-success.component';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactUs: UntypedFormGroup = new UntypedFormGroup({});
  formSubmitted: boolean = false;

  constructor(
    private _fb: UntypedFormBuilder,
    private contactService: ContactService,
    private _matDialog: MatDialog,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.contactUs = this._fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
    
    // Ensure all fields start as untouched
    Object.keys(this.contactUs.controls).forEach(key => {
      this.contactUs.controls[key].markAsUntouched();
    });
  }

  openDialog(successData: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.height = 'auto';
    dialogConfig.panelClass = 'mat-dialog-container';
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
    dialogConfig.disableClose = false;         // Closing the dialog if user click outside the dialog
    dialogConfig.position = {top: '100px'}
    dialogConfig.data = successData;

    const dialogRef = this._matDialog.open(MailSuccessComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(response => {
    })
  }

  sendMail() {
    this.formSubmitted = true;
    
    // Mark all fields as touched to show errors
    Object.keys(this.contactUs.controls).forEach(key => {
      this.contactUs.controls[key].markAsTouched();
    });

    if (this.contactUs.invalid) {
      return;
    }

    let payload = {
      firstname: this.contactUs.controls['firstname'].getRawValue(),
      lastname: this.contactUs.controls['lastname'].getRawValue(),
      email: this.contactUs.controls['email'].getRawValue(),
      message: this.contactUs.controls['message'].getRawValue()
    }

    this.contactService.submitInfo(payload).subscribe({
      next: (data: any) => {
        if(data.message.status === 'success') {
          let successData = {image_success: './assets/thank-you.jpg'};
          this.openDialog(successData);
          this.contactUs.reset();
          this.formSubmitted = false;
        }
      },
      error: (error) => {
        console.error('Error sending mail:', error);
      }
    });
  }

  shouldShowError(controlName: string): boolean {
    const control = this.contactUs.get(controlName);
    if (!control) return false;
    return control.invalid && (control.touched || control.dirty || this.formSubmitted);
  }
}
