import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact.model';


@Injectable()
export class ContactsService {

  //  API
  apiURL = environment.api_url;

  constructor(private http: HttpClient) { }

  /*========================================
     RESTful API CRUD Methods
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // HttpClient API get() method => Fetch contacts list
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiURL + '/contacts')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API get() method => Fetch contact
  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(this.apiURL + '/contacts/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API post() method => Create contact
  createContact(contact: Contact): Observable<Contact> {
   return this.http.post<Contact>(this.apiURL + '/contacts', JSON.stringify(contact), this.httpOptions)
     .pipe(
       retry(1),
       catchError(this.handleError)
     )
  }

  // HttpClient API put() method => Update contact
  updateContact(id: string, contact: Contact): Observable<Contact> {
   return this.http.put<Contact>(this.apiURL + `/contacts/${id}`, JSON.stringify(contact), this.httpOptions)
     .pipe(
       retry(1),
       catchError(this.handleError)
     )
  }

  // Error handling 
  handleError(error: { error: { message: string}; status: any; message: any; }) {

    return throwError(error.error);
  }

}
