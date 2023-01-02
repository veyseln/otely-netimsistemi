import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Agency } from 'src/app/interfaces/Agency';
import { AddAgencyRequest } from 'src/app/models/AddAgencyRequest';
import { AgencyService } from 'src/app/services/Agency.service';
import { Inject } from '@angular/core' ;
import Swal from 'sweetalert2';
interface DialogData {
  element: Agency;
  table: MatTable<any>;
  dialogRef: MatDialogRef<any>;
}
@Component({
  selector: 'app-updateagency',
  templateUrl: './updateagency.component.html',
  styleUrls: ['./updateagency.component.css']
})
export class UpdateagencyComponent implements OnInit {
 updateAgencyRequest: AddAgencyRequest = new AddAgencyRequest();
  constructor(
     private agencyService:AgencyService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<UpdateagencyComponent>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }
newCode: string
newName: string
newAdres:string
newTel:string
newMail:string
newLogo:"ds.jpg"
id=this.data.element.id;
  ngOnInit() {
  }
updateAgency(){
  if(!this.newCode||!this.newName){
    this.snackBar.open("Acente Kodu ve Acente Adını Doldurunuz")
    return;
  }
this.data.element.code=this.newCode;
this.data.element.name=this.newName;
this.data.element.logo=this.newLogo;
this.data.element.email=this.newMail;
this.data.element.address=this.newAdres;
this.data.element.tel=this.newTel;
Swal.fire({
  title:'Başarılı',
  text:'Kayıtlı Otel Güncellenmiştir.',
  icon:'success',
  showConfirmButton: false,
  timer:1500
}
)
this.agencyService.updateAgency(this.data.element).subscribe(resp=>{
});
this.dialogRef.close();
}
updatecancel(){
  this.dialogRef.close();
}
onFileChanged(event: any) {
  // Get the file from the event
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const binaryData = reader.result;
  }
}
}
