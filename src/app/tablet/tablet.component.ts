import { Component, OnInit } from '@angular/core';
import { HealthCareService } from '../health-care.service';

@Component({
  selector: 'app-tablet',
  templateUrl: './tablet.component.html',
  styleUrls: ['./tablet.component.scss']
})
export class TabletComponent implements OnInit {

  data: any= [];
  observableSubs: any;
  dataSource: any[] = [];
  displayedColumns: string[] = ['client', 'name', 'category'];

  DATA_CATEGORY: any[]= [];
  CATEGORIES: any[]= [];

  orderSort: string = "none"
  columnSort: string = ""; 

  constructor(private healthService: HealthCareService) { }

  ngOnInit(): void {
    this.getDirectory();   
  }

  ngOnDestroy(){ if (this.observableSubs) this.observableSubs.unsubscribe(); }

  getDirectory(): void{
    this.observableSubs = this.healthService.getDirectory().subscribe(    
      data => this.data = data,
      error => console.log(error),
    )
    let temp_array: any[] = [];

    this.data.forEach((a:any) => {
      temp_array.push(a.category)     
    });
    temp_array = temp_array.sort()  
    
    temp_array.forEach(el => (this.DATA_CATEGORY[el] = this.DATA_CATEGORY[el] + 1 || 1))
    
    Object.keys(this.DATA_CATEGORY).forEach((a: any)=>{
      this.CATEGORIES.push({
        "name": a,
        "number": this.DATA_CATEGORY[a]
      })
    }) 

    this.dataSource = this.data
  }

  searchBy(search: string){
    this.healthService.getDirectoryBySearch(search).subscribe(
      data => this.data = data,
      error => console.log(error),
    )
    this.dataSource = this.data
  }

  orderBy(sort: string){
   
    if(this.columnSort != sort){
      this.columnSort = sort;
      this.orderSort = "asc";
    }
    if(this.orderSort == "none"){
      this.orderSort = "asc";
    }

    if(this.orderSort == "asc"){
      this.orderSort = "desc";
    }

    if(this.orderSort == "desc"){
      this.orderSort = "asc";
    }

    let settingSort = {
      "sortBy": sort,
      "orderSort": this.orderSort
    }

    this.healthService.getDirectorySort(settingSort).subscribe(
      data => this.data = data,
      error => console.log(error),
    )
    
    console.log(this.data)

  }

}
