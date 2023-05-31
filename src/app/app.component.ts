import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authService = inject(AuthService);
  title = 'todo';
  // logged = false;
  is_logged() {
    return this.authService.is_logged();
  }

  ngOnInit(): void {
    this.authService.logging({ username: 'ouss', password: 'pass' });
  }

}
