import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Agency } from 'src/app/interfaces/Agency';
import { AddAgencyRequest } from 'src/app/models/AddAgencyRequest';
import { AcenteComponent } from 'src/app/Pages/acente/acente.component';
import { AgencyService } from 'src/app/services/Agency.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addagency',
  templateUrl: './addagency.component.html',
  styleUrls: ['./addagency.component.css']
})

export class AddagencyComponent implements OnInit {

  AgencydataSource = new MatTableDataSource<Agency>();
  addAgencyRequest:AddAgencyRequest = new AddAgencyRequest;
  rgagencycode:string="";
  rgagencyname:string="";
  rgagencyaddress:string="";
  rgagencylogo:string="";
  rgagencytel:string="";
  rgagencymail:string="";
  AgencysData: any;
  s:any= 0;
  agencys: Agency[] = [];
  data:any;
  a:boolean=true;




  constructor(private agencyService:AgencyService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AcenteComponent>,
    private agencysData: AgencyService,) {
      this.agencysData.getagency().subscribe((response) => {
        this.AgencysData= response;
   });

  }


  @ViewChild('fileInput') fileInput: ElementRef;
  ngOnInit() {
  }
  addagency(){

    this.a=true;
    this.addAgencyRequest.code = this.rgagencycode;
    this.addAgencyRequest.name = this.rgagencyname;
    this.addAgencyRequest.address = this.rgagencyaddress;
    this.addAgencyRequest.tel = this.rgagencytel;
    this.addAgencyRequest.logo =this.rgagencylogo;
    this.addAgencyRequest.email = this.rgagencymail;
    for(;this.s<this.AgencysData.length;this.s++){
      if(this.rgagencycode==this.AgencysData[this.s].code){
        this._snackBar.open("Kayıtlı Acenta Var!");
        this.a=false;
        break;
      }
      if(this.rgagencycode==""||this.rgagencyname=="")
        {
          this._snackBar.open("Lütfen Boş Alanları Doldurunuz.");
          this.a=false;
        }
      }
    if(this.a==true){
      this.agencyService.addAgency(this.addAgencyRequest).subscribe(resp=>{
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Acente Ekleme Başarılı',
      showConfirmButton: false,
      timer: 1500
    })
    this.dialogRef.close();
    window.location.reload();

    }
  }



onFileChanged(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const binaryData = reader.result;
  }

}
cancel(){
  this.dialogRef.close();
}
}


