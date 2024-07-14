import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

  salesPersonList:SalesPerson[]=[
    new SalesPerson("bhaskar","mudaliyar","mudaliyar@gmail.com",5000),
    new SalesPerson("soni","mudaliyar","soni@gmail.com",6000),
    new SalesPerson("kanishk","mudaliyar","kanishk@gmail.com",7000),
    new SalesPerson("sammy","mudaliyar","sammy@gmail.com",4000),
  ]
data: TemplateRef<NgIfContext<boolean>>|null;
  constructor() { }

  ngOnInit(): void {
  }

}
