import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";

export interface PeriodicElement1 {
  rank: number;
  number: string;
  name: string;
  gender: string;
  age: string;
  dob: string;
  country: string;
  event_type: string;
  time:string


}

const ELEMENT_DATA1: PeriodicElement1[] = [
  {
    rank: 1,
    number: "Lorem",  
    name: "Lorem",
    gender: "Lorem",
    age: "Lorem",
    dob: "Lorem",
    country: "Lorem",
    event_type: "Lorem",
    time: "Lorem",
  },

  {
    rank: 1,
    number: "Lorem",  
    name: "Lorem",
    gender: "Lorem",
    age: "Lorem",
    dob: "Lorem",
    country: "Lorem",
    event_type: "Lorem",
    time: "Lorem",
  },

  {
    rank: 1,
    number: "Lorem",  
    name: "Lorem",
    gender: "Lorem",
    age: "Lorem",
    dob: "Lorem",
    country: "Lorem",
    event_type: "Lorem",
    time: "Lorem",
  },

  {
    rank: 1,
    number: "Lorem",  
    name: "Lorem",
    gender: "Lorem",
    age: "Lorem",
    dob: "Lorem",
    country: "Lorem",
    event_type: "Lorem",
    time: "Lorem",
  },

  {
    rank: 1,
    number: "Lorem",  
    name: "Lorem",
    gender: "Lorem",
    age: "Lorem",
    dob: "Lorem",
    country: "Lorem",
    event_type: "Lorem",
    time: "Lorem",
  },

  {
    rank: 1,
    number: "Lorem",  
    name: "Lorem",
    gender: "Lorem",
    age: "Lorem",
    dob: "Lorem",
    country: "Lorem",
    event_type: "Lorem",
    time: "Lorem",
  },


  {
    rank: 1,
    number: "Lorem",  
    name: "Lorem",
    gender: "Lorem",
    age: "Lorem",
    dob: "Lorem",
    country: "Lorem",
    event_type: "Lorem",
    time: "Lorem",
  },

  {
    rank: 1,
    number: "Lorem",  
    name: "Lorem",
    gender: "Lorem",
    age: "Lorem",
    dob: "Lorem",
    country: "Lorem",
    event_type: "Lorem",
    time: "Lorem",
  },


];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  displayedColumns1: string[] = [
    "rank",
    "number",
    "name",
    "image",
    "gender",
    "age",
    "dob",
    "country",
    "event_type",
    "time",

  ];
  dataSource1 = new MatTableDataSource<PeriodicElement1>(ELEMENT_DATA1);

  @ViewChild("MatPaginator1") MatPaginator1!: MatPaginator;
  supportData: any;


  ngAfterViewInit() {
    this.dataSource1.paginator = this.MatPaginator1;
  }
  constructor(
  ) {}

  

  ngOnInit() {
  }
















 


}