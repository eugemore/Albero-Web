import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.sass']
})
export class MemberCardComponent implements OnInit {
  @Input('member') memberInput: any;
  @Input() editionBlocked: any;
  @Input() last: boolean = false;

  @Output() editingOutput: EventEmitter<void> = new EventEmitter<void>();
  @Output() addMemberOutput: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteMemberOutput: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.memberInput == undefined) {
      this.toggleEdit();
    }
  }

  toggleEdit() {
    this.editingOutput.emit();
  }

  addMember() {
    this.addMemberOutput.emit();
  }

  deleteMember(){
    this.deleteMemberOutput.emit()
  }
}
