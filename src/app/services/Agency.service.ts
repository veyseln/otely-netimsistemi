import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

constructor(private http:HttpClient) { }
getagency()
{
  return this.http.get(environment.url+"Agency/AgencyGet");
}
deleteagency(id:string)
{

  return this.http.delete(environment.url+"Agency/Delete/"+id)

}

}
