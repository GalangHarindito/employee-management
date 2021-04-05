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
import { CurrencyDirective } from '../../Directive/currency.directive';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    EmployeeDetailComponent, SeparatorPipePipe, CurrencyDirective
  ],
  imports: [CommonModule, EmployeeDetailRoutingModule, FormsModule, ReactiveFormsModule ],
  providers: [ CurrencyPipe, DecimalPipe ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class EmployeeDetailModule {}
