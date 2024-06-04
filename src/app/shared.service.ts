

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private usernameSource = new BehaviorSubject<string>('');
  currentUsername = this.usernameSource.asObservable();

  private employeeSource = new BehaviorSubject<any>(null);
  currentEmployee = this.employeeSource.asObservable();




  setUsername(username: string) {
    this.usernameSource.next(username);
  }
 
  setEmployee(employee: any) {
    this.employeeSource.next(employee);
  }
 
}
