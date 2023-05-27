import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss', '../../theme.scss']
})
export class ContactComponent implements OnInit {

  contactUs: UntypedFormGroup = new UntypedFormGroup({});

  constructor(
    private _fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {

    this.contactUs = this._fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['']
    })
  }

}
