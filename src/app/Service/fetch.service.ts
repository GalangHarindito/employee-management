import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class FetchService {
  user: any;
  data: any
  constructor(private http: HttpClient, private router: Router) {}

  login(data) {
    return this.http.post<any>(`/users/authenticate`, data).pipe(
      map((user) => {
        if (user && user.token) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("token", JSON.stringify(user.token));
          this.router.navigateByUrl('home');
        }
        return user;
      })
    );
  }

  getEmployee() {
    return this.http.get<any>(`/employee`)
  }

  getEmployeeById(id) {
    return this.http.get<any>(`/employee/${id}`)
  }

  putEmployeeById(id, data) {
    return this.http.put<any>(`/employee/edit/${id}`, data)
  }

  deleteEmployeeById(id): Observable<any> {
    return this.http.delete<Response>(`/employee/delete/${id}`)
  }

  createEmployee(data) {
    return this.http.post<any>(`/employee/create`, data)
  }


  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }
}
