import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { strings } from '@material/snackbar';
import { Agency } from 'src/app/interfaces/Agency';
import { AgencyService } from 'src/app/services/Agency.service';
import { UpdateagencyComponent } from '../updateagency/updateagency.component';
interface DialogData {
  element: Agency;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}

@Component({
  selector: 'app-agencyview',
  templateUrl: './agencyview.component.html',
  styleUrls: ['./agencyview.component.css']
})
export class AgencyviewComponent implements OnInit {
  AgencyData: any;
  agencys: Agency[] = [];
  url:any;
  constructor(
    private agencyService:AgencyService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AgencyviewComponent>,
    public dialog: MatDialog,
    private agencysData: AgencyService,

  ) {
    this.agencyService.getteragency(this.data.element.id).subscribe((response)=>{
      this.AgencyData = response;
    });
}
displayedColumns: string[] = ['id',];
id:string;
  ngOnInit() {
    // this.AgencyData = new MatTableDataSource<Agency>(this.agencys);
    console.log(this.data.element);

  }
  konum(){
    window.open('https://www.google.com/maps/place/'+this.data.element.address,'_blank') ;
  }

}
