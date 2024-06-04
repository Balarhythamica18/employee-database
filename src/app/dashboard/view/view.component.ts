import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
 employee: Employee | undefined;

  constructor(private router: Router,private sharedService: SharedService ) { }

  ngOnInit(): void {
    this.sharedService.currentEmployee.subscribe((employee) => {
      this.employee = employee;
      console.log(this.employee)
    });
  }
  

  logout(){this.router.navigate(['/login']);}
  back(){this.router.navigate(['/dashboard']);}
}
