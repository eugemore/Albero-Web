import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DateTime } from 'luxon';

interface DialogData {
  options: {
    nationality: string[],
    gender: {value:string, desc: string}[],
    status: string[],
  },
  member: any,
  avo: boolean
}

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.sass']
})
export class MemberDialogComponent implements OnInit {
  nationalityOptions: string[];
  genderOptions: {value:string, desc: string}[];
  statusOptions: string[];
  member: any;
  avo: boolean;

  editing: boolean = false;

  memberForm: FormGroup = this.fb.group({
    _id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    middleNames: new FormControl(''),
    nationality: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    alive: new FormControl(true, Validators.required),
    birth_date: new FormControl('', Validators.required),
    avo: new FormControl(false),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<MemberDialogComponent>,
    private fb: FormBuilder) { 
      this.nationalityOptions = data.options.nationality;
      this.genderOptions = data.options.gender;
      this.statusOptions = data.options.status;
      this.member = data.member;
      this.avo = data.avo;
    }

  ngOnInit(): void {
    if(this.member)
    this.setFormValues();
  }

  setFormValues() {
    this.memberForm.setValue({
      _id: this.member._id,
      firstName: this.member.firstName,
      lastName: this.member.lastName,
      middleNames: this.member.middleNames?? '',
      nationality: this.nationalityOptions.find((x: any) => x.toLowerCase() == this.member.nationality.toLowerCase()) ?? '',
      status: this.statusOptions.find((x: any) => x.toLowerCase() == this.member.status.toLowerCase()) ?? '',
      gender: this.member.gender ?? '',
      alive: this.member.alive,
      birth_date: this.member.birth_date ? DateTime.fromISO(this.member.birth_date).setLocale('it') : DateTime.now().setLocale('it'),
      avo: this.member.avo?? this.avo ?? false
    })
  }

  save(){
    if(this.memberForm.valid){
      this.dialogRef.close(this.memberForm.value)
    }
  }

  cancel(){
    this.dialogRef.close(undefined)
  }

}
