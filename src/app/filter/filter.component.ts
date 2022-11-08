import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() categories: any[]= [];
  @Output() search = new EventEmitter();

  constructor() { }

  ngOnInit(): void { 
    
  }

  getDirectoryBySearch(search: string){
        
    this.search.emit(search)

  }

}
