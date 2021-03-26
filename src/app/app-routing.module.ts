import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./Pages/login/login.component";
import { AuthguardService } from "./_helpers/authguard.service";
import { DashboardComponent } from "./Pages/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    component: DashboardComponent,
    canActivate:[AuthguardService],
    children:[
      {
    path: "home",
    loadChildren: () =>
      import("./Pages/home/home.module").then(
        (m) => m.HomeModule
      )
  },

      {
        path: "employee-list",
        loadChildren: () =>
          import("./Pages/employee-list/employee-list.module").then(
            (m) => m.EmployeeListModule
          )
      },
      {
        path: "employee-detail/detail",
        loadChildren: () =>
          import("./Pages/employee-detail/employee-detail.module").then(
            (m) => m.EmployeeDetailModule
          )
      },
    ]
  },
  
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
