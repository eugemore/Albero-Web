import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import { FamilyChartService } from '../services/families-chart.service';
import { Observable, forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';

interface docFile {
  type: string,
  release_date: Date,
  status: string,
  path: string,
  modified_date: Date,
}

interface document {
  status: string,
  type: string,
  relatedFiles: docFile[]
}
interface member {
  _id: string,
  firstName: string,
  middleNames: string,
  lastName: string,
  gender: string,
  nationality: string,
  status: string,
  alive: boolean,
  avo: boolean,
  generation: number,
  birth_date?: Date,
  documents: document[]
}

interface family {
  _id: string,
  email?: string,
  phone?: string,
  codiceFisale?: string,
  passport?: string,
  members: member[]
}


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.sass']
})
export class ChartComponent implements OnInit {
  protected family: family | undefined;
  protected familyMembers: any[] = [];
  editionBlocked: boolean = false;
  editOptions: any;

  constructor(
    private service: FamilyChartService,
    public dialog: MatDialog
  ) {
    this.onInitjoinedService().subscribe(x => {
      this.family = x.family;
      this.editOptions = {
        status: x.options.status,
        nationality: x.options.nationality,
        gender: x.options.gender
      };
      this.startFamilyMembers(x.family.members)
    });
  }
  // constructor() { }

  ngOnInit(): void {

  }

  onInitjoinedService(): Observable<any> {
    return forkJoin({
      family: this.service.getFamily(),
      options: this.service.getCardFormOptions(),
    })
  }

  startFamilyMembers(members: member[]) {
    if (members && members.length > 0) {
      this.familyMembers = members;
    }
    else {
      this.addMember(true);
    }
  }

  editMember(i: number): void {
    this.editionBlocked = !this.editionBlocked;
    this.dialog.open(MemberDialogComponent, {
      data: {
        options: this.editOptions,
        member: this.familyMembers[i]
      }
    })
      .afterClosed()
      .subscribe((x: member) => {
        if (x) {
          this.updateMember(x)
        }
        this.editionBlocked = !this.editionBlocked;
      })
  }

  addMember(avo: boolean) {
    this.editionBlocked = !this.editionBlocked;
    this.dialog.open(MemberDialogComponent, {
      data: {
        options: this.editOptions,
        member: undefined,
        avo: avo,
      }
    })
      .afterClosed()
      .subscribe((x: member) => {
        if (x) {
          this.updateMember(x)
        }
        this.editionBlocked = !this.editionBlocked;
      })
  }

  updateMember(member: member): void {
    if (this.family) {
      this.service.updateFamily(this.family._id, member).subscribe(x => {
        this.refreshMembers();
      });
    }
  }

  deleteMember(i: number) {
    this.familyMembers.splice(i, 1)
  }

  refreshMembers() {
    this.service.refreshMembers().subscribe( (x:member[])=>{
      this.familyMembers = x;
    })
  }
}
