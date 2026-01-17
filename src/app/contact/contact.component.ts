import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MailSuccessComponent } from './mail-success/mail-success.component';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', '../../theme.scss']
})
export class ContactComponent implements OnInit {

  contactUs: UntypedFormGroup = new UntypedFormGroup({});

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
    })
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
    let payload = {
      firstname: this.contactUs.controls['firstname'].getRawValue(),
      lastname: this.contactUs.controls['lastname'].getRawValue(),
      email: this.contactUs.controls['email'].getRawValue(),
      message: this.contactUs.controls['message'].getRawValue()
    }

    if(payload.firstname !== '' && payload.lastname !== '' && payload.email !== '') {
      this.contactService.submitInfo(payload).subscribe((data: any) => {
        if(data.message.status === 'success') {
          let data = {image_success: './assets/thank-you.jpg'}
          this.openDialog(data);
        }
      });
    } else {
      if(payload.firstname === '') {
        this.contactUs.controls['firstname'].setValidators(Validators.required)
      } else if(payload.lastname === '') {
        this.contactUs.controls['lastname'].setValidators(Validators.required)
      } else if(payload.email === '') {
        this.contactUs.controls['email'].setValidators([Validators.required, Validators.email])
      } else {

      }

      this.contactUs.updateValueAndValidity();
    }
  }
}
