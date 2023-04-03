import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Occupation } from '../model/Occupations';
import { UserPolicyDetails } from '../model/UserPolicyDetails';

let hostUrl: string; 

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) 
  {
    hostUrl = 'http://localhost:5139/PremiumCal/';
  }

  getOccupationList():Observable<Occupation[]> {
    return this.http.get<Occupation[]>(hostUrl + "OccupationList/")
      .pipe(
        // retry(1), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getPremium(usrPolicyDet: UserPolicyDetails):Observable<number> {
    return this.http.post<number>(hostUrl + "GetMonthlyPremium/", usrPolicyDet)
    .pipe(
        // retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error;
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
