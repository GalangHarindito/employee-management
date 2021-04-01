import { CommonModule } from "@angular/common";
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeAddRoutingModule } from "./employee-add-routing.module";
import { EmployeeAddComponent } from "./employee-add.component";

@NgModule({
  declarations: [
    EmployeeAddComponent
  ],
  imports: [CommonModule, EmployeeAddRoutingModule , FormsModule, ReactiveFormsModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class EmployeeAddModule {}