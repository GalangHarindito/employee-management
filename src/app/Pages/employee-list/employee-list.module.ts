import { CommonModule } from "@angular/common";
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { TableComponent } from "src/app/Components/table/table.component";
import { FilterPipe } from "src/app/pipe.pipe";
import { EmployeeListRoutingModule } from "./employee-list-routing.module";
import { EmployeeListComponent } from "./employee-list.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    EmployeeListComponent,
    TableComponent,
    FilterPipe,
  ],
  imports: [CommonModule, EmployeeListRoutingModule, FormsModule, ReactiveFormsModule, NgxPaginationModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class EmployeeListModule {}
