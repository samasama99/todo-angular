import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectUser } from './auth-state/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  store = inject(Store);
  title = 'todo';
  logged$ = this.store.select(selectIsLoggedIn);
  // logged = false;
  ngOnInit(): void {
    // this.authService.login({ username: 'ouss', password: 'pass' });
  }

}
