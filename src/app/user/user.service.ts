import { Injectable } from '@angular/core';
import { User } from "./user";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";



@Injectable()
export class UserService {

  private apiUrl = 'http://localhost:9500/dashbord/utilisateurs';
  private apiUrl1 = 'http://localhost:9500/dashbord/utilisateur';

  private apiUrllog = 'http://localhost:9500/Authentification';
  



  
  
  
  

  constructor(private http: Http) {
  }

  findAll(): Observable<User[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**findById(id: number): Observable<User> {
    return null;
  }**/

  
  saveUser(user: User): Observable<User> {
    return this.http.post(this.apiUrl1, user)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }
  /**deleteUserById(id: string): Observable<boolean> {
    return null;
  }**/


  findById(id: string): Observable<User> {
    return this.http.get(this.apiUrl1+'/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error'));
  }
  updateUser(user: User): Observable<User> {
    return this.http.put(this.apiUrl1+'/'+ user.id, user)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  deleteUserById(id: string): Observable<boolean> {
    return this.http.delete(this.apiUrl1 + '/'+ id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  loginUser(user: User): Observable<User> {
    return this.http.post(this.apiUrllog, user)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }
}

