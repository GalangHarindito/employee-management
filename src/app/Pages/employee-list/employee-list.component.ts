import { Component, DoCheck, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FetchService } from "../../Service/fetch.service";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent implements OnInit, DoCheck {
  data: any;
  lengthData: any;
  searchKey: any;
  titles: any = [
    "ID",
    "Name",
    "Group",
    "Email",
    "Birth Date",
    "Basic Salary",
    "Status",
    "Action",
  ];
  fetchLogin: any;
  groups: any = [
    { title: "All", enum: [] },
    { title: "Goal Keeper", enum: "goalKeeper" },
    { title: "Defender", enum: "defender" },
    { title: "Midfielder", enum: "midfielder" },
    { title: "Forward", enum: "forward" },
  ];
  filterEnum: any;
  newData: any;
  order: any;

  constructor(
    private FetchService: FetchService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getEmployee();
    this.querryParams();
  }

  ngDoCheck() {
    this.changeProperty();
    console.log(this.data)
  }

  getEmployee() {
    this.fetchLogin = this.FetchService.getEmployee().subscribe(
      (res) => {
        this.data = res;
      },
      (error) => {}
    );
  }

  deleteEmployee(id) {
    this.fetchLogin = this.FetchService.deleteEmployeeById(id).subscribe(
      (res) => {},
      (error) => {}
    );
  }

  changeProperty() {
    for (const i in this.data) {
      switch (this.data[i].group) {
        case "goalKeeper":
          this.data[i].group = "Goal Keeper";
          break;
        case "midfielder":
          this.data[i].group = "Midfielder";
          break;
        case "forward":
          this.data[i].group = "Forward";
          break;
        case "defender":
          this.data[i].group = "Defender";
          break;
      }
      switch (this.data[i].status) {
        case true:
          this.data[i].status = "Active Play";
          break;
        case false:
          this.data[i].status = "Retire";
          break;
      }
    }
  }

  onFilter($event){
    this.filterEnum = $event.target.value;
    this.goSearch();
  }

  onSearch(searchKey: string) {
    this.searchKey = searchKey;
    this.goSearch();
  }

  onAddEmployee() {
    this.router.navigateByUrl("/home/employee-list/add");
  }

  goSearch() {
    this.router.navigate(["employee-list"], {
      queryParams: { keyword: this.searchKey, filter: this.filterEnum, page: '1' },
    });
  }

  querryParams() {
    this.route.queryParamMap.subscribe((params) => {
      this.order = { ...params.keys, ...params };
    });
    this.searchKey = this.order.params.keyword;
    this.filterEnum = this.order.params.filter;
  }

  goAddEmployee() {
    this.router.navigate(["employee-detail/detail"], {
      queryParams: { keyword: this.searchKey, filter: this.filterEnum, page: '1' },
    });
  }

}
