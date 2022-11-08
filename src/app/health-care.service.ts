import { Injectable } from '@angular/core';
import { DATA } from './mock-data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthCareService {

  constructor() { }

  getDirectory(): Observable<any[]>{
    const directory =  of(DATA)
    return directory;
  }
}
