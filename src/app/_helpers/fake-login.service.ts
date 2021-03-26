import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";
import { login } from "../Data/login";
import { employee } from "../Data/employee";


@Injectable({
  providedIn: "root",
})
export class FakeLoginService implements HttpInterceptor {
  id: any;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith("/users/authenticate") && method === "POST":
          return authenticate();
        case url.endsWith("/users") && method === "GET":
          return getUsers();
        case url.endsWith("/employee") && method === "GET":
          return getEmployee();
        case url.match(/\/employee\/edit\/\d+$/) && method === "PUT":
          return putEmployeeId();
        case url.match(/\/employee\/\d+$/) && method === "GET":
          return getEmployeeById();
        case url.match(/\/employee\/\d+$/) && method === "GET":
          return getEmployeeById();
        case url.endsWith("/employee/create") && method === "POST":
          return createEmployeeById();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }

      function authenticate() {
        const { username, password } = body;
        const user = login.users.find(
          (x) => x.userName === username && x.password === password
        );
        if (!user) return error("Username or password is incorrect");
        return ok({
          username: user.userName,
          token: user.jwt,
        });
      }

      function getUsers() {
        if (!isLoggedIn()) return unauthorized();
        return ok(body);
      }

      function getEmployee() {
        return getData(employee);
      }

      function getEmployeeById() {
        const splitUrl = url.split("/");
        const id = Number(splitUrl[2]);
        const result = employee.find((item) => item.id === id);
        return ok(result);
      }

      function putEmployeeId() {
        const splitUrl = url.split("/");
        const id = Number(splitUrl[3]);
        for(const i in employee){
          if(employee[i].id === id){
            employee.splice(Number(i),1,body)
          }
        }
        return ok(employee);
      }

      function deleteUser() {
        const splitUrl = url.split("/");
        const id = Number(splitUrl[3]);
        employee.filter((x) => x.id !== id);
        
        return ok(employee);
      }

      function createEmployeeById() {
        const user = body;
        user.id = employee.length ? Math.max(...employee.map(x => x.id)) + 1 : 1;
        employee.push(user)
        return ok(employee);
      }

      // helper functions

      function ok(body?) {
        return of(new HttpResponse({ status: 200, body, statusText: "succes" }));
      }

      function getData(body) {
        return of(new HttpResponse({ status: 200, body }));
      }

      function error(message) {
        return throwError({ error: { message } });
      }

      function unauthorized() {
        return throwError({ status: 401, error: { message: "Unauthorised" } });
      }

      function isLoggedIn() {
        return headers.get("Authorization") === "uinai732KASka()(";
      }
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeLoginService,
  multi: true,
};
