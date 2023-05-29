import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { TodosViewerComponent } from './todos-viewer/todos-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    NewTodoComponent,
    TodosViewerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
