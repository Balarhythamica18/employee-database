import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {  Employee } from './employee.model';
import { SharedService } from '../shared.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @ViewChild('idField') idField!: ElementRef;
username: any;
loggedInUsername: any;
IN: any;
alert:boolean=true;
currentPage: number = 1;
  itemsPerPage: number = 3;
  isLoggedIn:boolean=true;
page: any;
showSuccessMessage: boolean = false;
sortOrder: 'asc' | 'desc' = 'asc';
exist:boolean=false;
iderror:boolean=false;
isCheckingDuplicateId: boolean = false;
totalEmployees: number = 0;
itemsPerPageOptions: number[] = [ 3, 6,9]; 
totalItems: number = 0; // Total number of items
minHeightPerItem: number = 50;

calculateMinHeight(): number {
  return this.itemsPerPage * this.minHeightPerItem;
}








constructor(private router: Router, private sharedService: SharedService){}
 ngOnInit(): void{
  setTimeout(() => {
    this.alert = false;
  }, 3000); 
  
}

 addbtn=new FormGroup({
    id:new FormControl<string | null>("",[ Validators.required, Validators.pattern('^[0-9]+$')]),
    name:new FormControl<string | null>("",[Validators.required, Validators.pattern("[a-zA-Z].*")]),
    dob:new FormControl<string | null>("",[Validators.required,]),
    gender:new FormControl<string | null>("",[Validators.required,]),
    doj:new FormControl<string | null>("",[Validators.required,]),
    email: new FormControl<string | null>("", [Validators.required,  Validators.pattern(/^[a-zA-Z].*\d+@gmail\.com$/)]),
    address:new FormControl<string | null>("",[Validators.required,]),
    designation:new FormControl("",[Validators.required,]),
    projectName:new FormControl("",[Validators.required,]),
    location:new FormControl<string|null>("",[Validators.required,]),
});





   get id(): FormControl{
     return this.addbtn.get("id") as FormControl;
   }
   get name(): FormControl{
     return this.addbtn.get("name") as FormControl;
   }
   get dob(): FormControl{
     return this.addbtn.get("dob") as FormControl;
   }
   get gender(): FormControl{
     return this.addbtn.get("gender") as FormControl;
   }
   get doj(): FormControl{
    return this.addbtn.get("doj") as FormControl;
  }
  get email(): FormControl{
    return this.addbtn.get("email") as FormControl;
  }
   get address(): FormControl{
    return this.addbtn.get("address") as FormControl;
  }
   get designation(): FormControl{
     return this.addbtn.get("designation") as FormControl;
   }
   
   get projectName(): FormControl{
    return this.addbtn.get   ("projectName") as FormControl;
   }
   get location(): FormControl{
    return this.addbtn.get("location") as FormControl;
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


   employees: Employee[]=[
    {id:6901,name:'Arjun', dob:'2002-08-01',gender:'male',doj:'2023-08-01',address:'chennai',designation:'UI Developer',  projectName:'Project-1',location:'India', email:'arjun6901@gmail.com'},
    {id:6902,name:'Swetha', dob:'2001-08-19',gender:'female',doj:'2023-05-10',address:'Kumbakonam',designation:'Java Developer', projectName:'Project-3',location:'United states',email:'swetha6902@gmail.com'},
    {id:5963,name:'Anjana', dob:'2004-08-18',gender:'female',doj:'2023-06-15',address:'pondicherry',designation:'Python Developer', projectName:'Project-2',location:'paris',email:'anjana5963@gmail.com'},
    {id:5964,name:'Rocky', dob:'1999-08-02',gender:'male',doj:'2023-09-18',address:'Banglur',designation:'UI Developer', projectName:'Project-2',location:'singapore',email:'rocky5964@gmail.com'},
    {id:6685,name:'Harini', dob:'1999-08-01',gender:'female',doj:'2023-09-18',address:'kolkata',designation:'Java Developer', projectName:'Project-3',location:'India',email:'harini6685@gmail.com'},
    {id:6096,name:'Shankar', dob:'1996-06-02',gender:'male',doj:'2023-07-10',address:'Banglur',designation:'UI Developer', projectName:'Project-1',location:'singapore',email:'shankar6096@gmail.com'},
    {id:6001,name:'Narmatha', dob:'1998-06-02',gender:'female',doj:'2023-07-10',address:'Kochin',designation:'UI Developer', projectName:'Project-1',location:'India',email:'narmatha1321@gmail.com'},];


    searchTerm: string = '';

    get filteredEmployees(): Employee[] {
      if (!this.searchTerm.trim()) return this.employees;
      return this.employees.filter(employee =>
        employee.id === parseInt(this.searchTerm.trim()) ||
        employee.name.toLowerCase().includes(this.searchTerm.toLowerCase())||
        employee.gender.toLowerCase() === this.searchTerm.toLowerCase() || 
        employee.address.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.designation.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.projectName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        this.getYear(employee.dob) == parseInt(this.searchTerm.trim()) ||
        this.getYear(employee.doj) == parseInt(this.searchTerm.trim())
    );
  
}
getYear(dateString: string): number {
    return new Date(dateString).getFullYear();
}
updateFilteredEmployees() {
  // Update filteredEmployees based on searchTerm
  this.currentPage = 1; // Reset to first page when search term changes
}

addEmployee() {
  const newEmployee = this.addbtn.value;
  
 const existingEmployee = this.employees.find(employee => employee.id == newEmployee.id);
  if (existingEmployee) {
    this.iderror=true;
    return
  }

  if (this.addbtn.valid) {
    const employeeToAdd: Employee = {
      id: newEmployee.id || '',
      name: newEmployee.name || '',
      dob: newEmployee.dob || '',
      gender: newEmployee.gender || '',
      doj: newEmployee.doj || '',
      email: newEmployee.email || '',
      address: newEmployee.address || '',
      designation: newEmployee.designation || '',
      projectName: newEmployee.projectName || '',
      location: newEmployee.location || '',
    };

    this.employees.push(employeeToAdd);
    localStorage.setItem('employees', JSON.stringify(this.employees));
    this.clearform();

    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false; 
    }, 5000);
  }
  this.updateEmployeeCount();
  
}

    
    
    
   clearform(){this.addbtn.reset();}
   logout() {
    if (this.isLoggedIn) {      this.router.navigate(['/login']);
    }
  }
  
  deleteEmployee(employeeToDelete: Employee) {
  const index = this.employees.findIndex(employee => employee === employeeToDelete);
  if (index !== -1) {
    this.employees.splice(index, 1);
  }

  
}
updateEmployee(updatedEmployee: any) {
  const index = this.employees.findIndex((e) => e.id === updatedEmployee.id);
  if (index !== -1) {
    this.employees[index] = updatedEmployee;
  }
}
viewEmployeeDetails(employee: any) {
  this.sharedService.setEmployee(employee);
  this.router.navigate(['/dashboard', employee.id, 'view']);
}

//title = 'rou'; 
//  formattedaddress=" "; 
//  options={ 
//  componentRestrictions:{ 
//     country:["AU"] 
//    } 
//  } 
//  public AddressChange(address: any) { 
//   this.formattedaddress=address.formatted_address 
//} 
get paginatedEmployees(): Employee[] {
  const filteredEmployees = this.filteredEmployees;
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);
  return paginatedEmployees;
}

onPageChange(pageNumber: number) {
  const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  
  if (pageNumber < 1) {
    this.currentPage = 1;
  } else if (pageNumber > totalPages) {
    this.currentPage = totalPages;
  } else {
    this.currentPage = pageNumber;
  }
}

get totalPages(): number {
  const totalItems = this.filteredEmployees.length;
  return totalItems > 0 ? Math.ceil(totalItems / this.itemsPerPage) : 1;
}

get totalPagesArray(): number[] {
  return Array.from({ length: this.totalPages }, (_, index) => index + 1);
}

onItemsPerPageChange() {
    this.currentPage = 1;
 /*  this.calculateTotalPages();*/
}
 /*calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }*/


sortOrders = {
  id: 'asc',
  name: 'asc',
  dob: 'asc',
  gender: 'asc',
  doj: 'asc',
  address: 'asc',
  designation: 'asc',
  projectName: 'asc',
  location: 'asc',
  email: 'asc'
};


toggleSortOrder(column: keyof Employee) {
  this.sortOrders[column] = this.sortOrders[column] === 'asc' ? 'desc' : 'asc';
  this.employees.sort((a, b) => {
    const order = this.sortOrders[column] === 'asc' ? 1 : -1;
    if (a[column] < b[column]) return -1 * order;
    if (a[column] > b[column]) return 1 * order;
    return 0;
  });
}
cancel() {
  this.iderror = false; 
}
checkForDuplicateId() {
  const newId = this.addbtn.value.id ?? '';
  const existingEmployee = this.employees.find(employee => employee.id === parseInt(newId));
  this.iderror = !!existingEmployee;
}
updateEmployeeCount() {
  // Retrieve employees from localStorage or use the initial array
  const storedEmployees = localStorage.getItem('employees');
  this.employees = storedEmployees ? JSON.parse(storedEmployees) : this.employees;
  // Update the total count
  this.totalEmployees = this.employees.length;
}
}








