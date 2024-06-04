import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { SharedService } from 'src/app/shared.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   username: string = '';
   
  constructor(private router: Router,private sharedService: SharedService){
    this.sharedService.currentUsername.subscribe(username => {
      this.username = username;
    });
  }
  ngOnInit(): void {}
  logout(){this.router.navigate(['/login']);}
}

