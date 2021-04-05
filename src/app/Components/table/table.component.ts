import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit, AfterViewInit {
  p: number;
  @Input() dataTable: any;
  @Input() searchText: any;
  @Input() titlesTable: any;
  @Input() filterEmployee: any;
  newData: any;
  collection: any[];
  pageList = 10;
  currentUrl: any;
  urlTree: any;
  order:any;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private location: Location
  ) {
    this.currentUrl = activateRoute.snapshot["_routerState"].url;
  }

  ngOnInit() {
    this.querryParams()
  }

  ngAfterViewInit() {
    this.getClassStatus;
    this.page;
  }

  page(page: any) {
    this.p = Number(page);
    this.urlTree = this.router.createUrlTree([], {
      queryParams: { page: this.p },
      queryParamsHandling: "merge",
      preserveFragment: true,
    });
    this.location.go(this.urlTree);
  }

  detailEmployee(id) {
    this.router.navigateByUrl(`/employee-detail/${id}`);
  }

  deleteEmployee(id) {
    window.alert('Are you sure want to delete')
    this.newData = this.dataTable.filter((x) => x.id !== id);
    return (this.dataTable = this.newData);
  }

  viewPageSelected($event) {
    this.pageList = $event.target.value;
  }

  goEmployeeEdit(id) {
    this.router.navigate(["employee-detail"], {
      queryParams: { editEmployee: "true", id: `${id}` },
    });
  }

  querryParams() {
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.order = { ...params.keys, ...params };
    });
    this.p = Number(this.order.params.page);
  }

  getClassStatus(value) {
    return {
      "retire": value === "Retire",
      "active-play": value === "Active Play",
    };
  }
}
