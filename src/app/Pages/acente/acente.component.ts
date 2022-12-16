import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AddagencyComponent } from 'src/app/components/addagency/addagency.component';
import { UpdateagencyComponent } from 'src/app/components/updateagency/updateagency.component';
import { Agency } from 'src/app/interfaces/Agency';
import { AddAgencyRequest } from 'src/app/models/AddAgencyRequest';
import { AgencyService } from 'src/app/services/Agency.service';
import { RoomtypeService } from 'src/app/services/roomtype.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acente',
  templateUrl: './acente.component.html',
  styleUrls: ['./acente.component.css']
})
export class AcenteComponent implements OnInit {
  addAgencyRequest: AddAgencyRequest = new AddAgencyRequest();
  AgencyData: any;
  displayedColumns: string[] = ['id', 'Code', 'Name','Address','Logo','Tel','Email', 'updateico'];
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
          text:'Kayıtlı Oda Tipi Silindi',
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
  editAgency(element: any) {

    const dialog = this.dialog.open(UpdateagencyComponent, {
      data: { element },
    });
  }
  addAgency() {
    this.dialog.open(AddagencyComponent,{data:this.AgencyData});

  }

}
