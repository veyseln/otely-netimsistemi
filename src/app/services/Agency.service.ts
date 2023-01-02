import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agency } from '../interfaces/Agency';

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
addAgency(addAgency:Agency):Observable<any>
  {

    return this.http.post(environment.url+"Agency/AddAgency",addAgency);
  }

  updateAgency(updateAgency:Agency):Observable<any>
  {

    return this.http.put(environment.url+"Agency/Update/0",updateAgency)
  }
  getteragency(id:any)
{
  return this.http.get(environment.url+"Agency/"+id);
}

}
