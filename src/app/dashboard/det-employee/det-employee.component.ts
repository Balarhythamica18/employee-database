import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-det-employee',
  templateUrl: './det-employee.component.html',
  styleUrls: ['./det-employee.component.css']
})
export class DetEmployeeComponent {
  @Input() employee: Employee | undefined;
  @Output() deleteConfirmed: EventEmitter<Employee> = new EventEmitter<Employee>();

  onConfirmDelete() {
    this.deleteConfirmed.emit();
  }

  deleteEmployeeConfirmed($event:any) {
    console.log($event);
    if (this.employee) {
      this.deleteConfirmed.emit(this.employee);
    }
  }
  

}