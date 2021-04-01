import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit, AfterViewInit {
  p: number = 1;
  @Input() dataTable: any;
  @Input() searchText: any;
  @Input() titlesTable: any;
  @Input() filterEmployee: any;
  newData: any;
  collection: any[];
  page = 10;

  constructor(private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getClassStatus;
  }

  detailEmployee(id) {
    this.router.navigateByUrl(`/employee-detail/${id}`);
  }

  deleteEmployee(id) {
    this.newData = this.dataTable.filter((x) => x.id !== id);
    return (this.dataTable = this.newData);
  }

  navSelected($event) {
    this.page = $event.target.value;
  }

  goEmployeeEdit(id) {
    this.router.navigate(["employee-detail"], {
      queryParams: { editEmployee: "true", id: `${id}` },
    });
  }

  getClassStatus(value) {
    return {
      "retire": value === "Retire",
      "active-play": value === "Active Play",
    };
  }
}
