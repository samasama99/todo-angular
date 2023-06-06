import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { TodosViewerComponent } from './todos-viewer/todos-viewer.component';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { todoReducer } from './todo-state/todo.reducer';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './todo-state/todo.effects';
import { authReducer } from './auth-state/auth.reducer';
import { AuthEffects } from './auth-state/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    NewTodoComponent,
    TodosViewerComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    StoreModule.forRoot({ todos: todoReducer, auth: authReducer }), // Register the todos and auth feature states
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
    }),
    HttpClientModule,
    AppRoutingModule,
    EffectsModule.forRoot([TodoEffects, AuthEffects]), // Register the TodoEffects and AuthEffects
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  authService: AuthService = inject(AuthService);
}
