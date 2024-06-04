
import { Component, EventEmitter, Input, Output, SimpleChange, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @Input() employee: any;
  @Output() employeeUpdated = new EventEmitter<any>();
  changesMade = false;
  editedEmployee: any;
  editForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    this.changesMade = false;
    if (changes["employee"]) {
      if (changes["employee"].currentValue) {
        this.editedEmployee = { ...changes["employee"].currentValue };
        this.changesMade = false;
      }
    }
  }
  

  initializeForm(): void {
    this.editForm = this.formBuilder.group({
      id: [this.employee.id, Validators.required],
      name: [this.employee.name, [Validators.required, Validators.pattern('^[^0-9]*$')]],
      dob: [this.employee.dob, Validators.required],
      gender: [this.employee.gender, Validators.required],
      email: [this.employee.email, Validators.required],
      address: [this.employee.address, Validators.required],
      doj: [this.employee.doj, Validators.required],
      designation: [this.employee.designation, Validators.required],
      projectName: [this.employee.projectName, Validators.required],
      location: [this.employee.location, Validators.required],
    });
  }

  formComplete(): boolean {
    return this.editedEmployee.name &&
           this.editedEmployee.dob &&
           this.editedEmployee.gender &&
           this.editedEmployee.email &&
           this.editedEmployee.address &&
           this.editedEmployee.doj &&
           this.editedEmployee.designation &&
           this.editedEmployee.projectName &&
           this.editedEmployee.location;
  }
  
  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    return formattedDate;
  }

  getMaxDate(): string {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    const formattedDate = maxDate.toISOString().split('T')[0];
    return formattedDate;
  }

  updateEmployee() {
    this.employeeUpdated.emit(this.editedEmployee);
    this.changesMade = false;
  }
}


