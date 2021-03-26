import { CommonModule } from "@angular/common";
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { EmployeeDetailRoutingModule } from "./employee-detail-routing.module";
import { EmployeeDetailComponent } from "./employee-detail.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeparatorPipePipe } from "src/app/separator-pipe.pipe";

@NgModule({
  declarations: [
    EmployeeDetailComponent, SeparatorPipePipe,
  ],
  imports: [CommonModule, EmployeeDetailRoutingModule, FormsModule, ReactiveFormsModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class EmployeeDetailModule {}
