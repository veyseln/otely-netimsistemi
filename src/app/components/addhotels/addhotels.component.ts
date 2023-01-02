import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { timer } from 'rxjs';
import { Hotel } from 'src/app/interfaces/Hotel';
import { RoomType } from 'src/app/interfaces/RoomType';
import { AddHotelRequest } from 'src/app/models/AddHotelRequest';
import { HotelComponent } from 'src/app/Pages/hotel/hotel.component';
import { HotelsService } from 'src/app/services/Hotel.service';
import { RoomtypeService } from 'src/app/services/roomtype.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addhotels',
  templateUrl: './addhotels.component.html',
  styleUrls: ['./addhotels.component.css']
})
export class AddhotelsComponent implements OnInit {
  HoteldataSource = new MatTableDataSource<Hotel>();
  RoomtypeData: any;
  types: RoomType[] = [];
  addHotelRequest:AddHotelRequest = new AddHotelRequest;
  rghotelcode:string="";
  rghotelname:string="";
  hotelscode:string="";
  HotelData: any;
  s:any= 0;
  hotels: Hotel[] = [];
  data:any;
  a:boolean=true;
  hotelCode:string="";
  hotelName:string="";

  constructor(private hotelService:HotelsService,
    private _snackBar: MatSnackBar,
    private typesData: RoomtypeService,
    public dialogRef: MatDialogRef<HotelComponent>,
    private hotelData: HotelsService,) {
      this.hotelData.gethotel().subscribe((response) => {
        this.HotelData = response;
   });
   this.typesData.getroomtype().subscribe((response) => {
      this.RoomtypeData = response;
      console.log(this.RoomtypeData);
    });
  }


cancel(){
  this.dialogRef.close();

}
  ngOnInit() {

  }
  addhotels(){
    this.a=true;
    this.addHotelRequest.hotelCode = this.rghotelcode;
    this.addHotelRequest.hotelName = this.rghotelname;
    for(;this.s<this.HotelData.length;this.s++){
      if(this.rghotelcode==this.HotelData[this.s].hotelCode){
        this._snackBar.open("Kayıtlı Otel Var!");
        this.a=false;
        break;
      }

    }
    if(this.rghotelcode==""||this.rghotelname=="")
        {
          this._snackBar.open("Lütfen Boş Alanları Doldurunuz.");
          this.a=false;
        }
    if(this.a==true){
      this.hotelService.addHotel(this.addHotelRequest).subscribe(resp=>{
    });
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Otel Ekleme Başarılı',
      showConfirmButton: false,
      timer: 1500
    })
    this.dialogRef.close();
    window.location.reload();

}

}
}


