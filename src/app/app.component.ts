import { Component } from '@angular/core';
import 'moment/locale/es';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'platzi-overflow2';

  constructor(private authService: AuthService) { }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  fullName(){
    return this.authService.currentUser.fullName(); 
  }

  logout(){
    this.authService.logout();
  }
}