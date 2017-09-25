import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, } from '@angular/http';
import { CustomHttpService } from './default.header.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { CommonService } from './common.service';

@Injectable()

export class StudentRatingService {

  public serverUrl: string;

  constructor(private http: CustomHttpService,
    private htttp: Http,
    private con: CommonService) {
    // this.getUrl();
  }

  // getUrl() {
  //   this.serverUrl = this.con.baseUrl + "class-teacher" + "/" + this.con.userId;
  // }

  getStudents() {
    // var options = new RequestOptions({
    //   headers: new Headers({
    //     'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    //   })
    // });

    return this.http.get(this.con.studentRatingUrl + "/student-profile/student")
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStudentRating(studentId: any) {
    var options = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    });
    return this.http.get(this.con.studentRatingUrl + '/student-profile/' + studentId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveStudentRating(data: any, isEmpty: any) {
    var options = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    });

    if (isEmpty) {
      return this.http.post(this.con.studentRatingUrl + '/student-profile/', data, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
    else {
      return this.http.put(this.con.studentRatingUrl + '/student-profile/', data, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  private extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.ok || ''}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "No Internet"`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}