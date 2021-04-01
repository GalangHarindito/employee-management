import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FetchService } from "../../Service/fetch.service";
import * as moment from "moment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  data:any = {};
  constructor(
    public activatedRoute: ActivatedRoute,
    private FetchService: FetchService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  groups: any = [
    { title: "Goal Keeper", enum: "goalKeeper" },
    { title: "Defender", enum: "defender" },
    { title: "Midfielder", enum: "midfielder" },
    { title: "Forward", enum: "forward" },
  ];

  option: any = [
    { title: "Active Play", enum: true },
    { title: "Retire", enum: false },
  ];

  ngOnInit() {
    
  }
}

  


