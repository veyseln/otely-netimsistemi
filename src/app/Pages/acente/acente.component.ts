import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AddagencyComponent } from 'src/app/components/addagency/addagency.component';
import { AgencyviewComponent } from 'src/app/components/agencyview/agencyview.component';
import { UpdateagencyComponent } from 'src/app/components/updateagency/updateagency.component';
import { Agency } from 'src/app/interfaces/Agency';
import { AddAgencyRequest } from 'src/app/models/AddAgencyRequest';
import { AgencyService } from 'src/app/services/Agency.service';
import { RoomtypeService } from 'src/app/services/roomtype.service';
import Swal from 'sweetalert2';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
interface DialogData {
  element: Agency;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}
@Component({
  selector: 'app-acente',
  templateUrl: './acente.component.html',
  styleUrls: ['./acente.component.css']
})
export class AcenteComponent implements OnInit {


  addAgencyRequest: AddAgencyRequest = new AddAgencyRequest();
  AgencyData: any;
  displayedColumns: string[] = ['id','Logo', 'Kod', 'İsim','Adres','Telefon','Email', 'updateico'];
  agencys: Agency[] = [];

  constructor(private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private agencysData: AgencyService,) {
      this.agencysData.getagency().subscribe((response) => {
        this.AgencyData = response;
        console.log(this.AgencyData);
      });
     }
     @ViewChild(MatTable)
  table: MatTable<Agency>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.AgencyData = new MatTableDataSource<Agency>(this.agencys);
  }
  removeAgency(element:any) {
    Swal.fire({
      title: 'Emin misin?',
      text:"Kayıtlı Oda Tipini Silmek İstiyor musun?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Hayır,İptal Et',
      confirmButtonText: 'Evet,Sil'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:'Silinme İşlemi Başarılı',
          text:'Kayıtlı Acente Silindi',
          icon:'success',
          showConfirmButton: false,
          timer:1500
        }
        )
        this.agencysData.deleteagency(element).subscribe((result) => {
          this.agencysData.getagency().subscribe((response) => {
            this.AgencyData = response;
          });
        });
      }
    })
  }
  cellClicked(element:any) {

    const dialog = this.dialog.open(AgencyviewComponent, {
      width:'500px',
      height:'360px',
      data: { element},
    });
  }
  editAgency(element: any) {

    const dialog = this.dialog.open(UpdateagencyComponent, {
      data: { element },

    });
  }
  addAgency() {
    this.dialog.open(AddagencyComponent,{

    });
  }
}
