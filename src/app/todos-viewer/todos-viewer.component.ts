import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-todos-viewer',
  templateUrl: './todos-viewer.component.html',
  styleUrls: ['./todos-viewer.component.css']
})
export class TodosViewerComponent {

  @Input() todos: Todo[] = [];
  @Output() deleteEvent = new EventEmitter<Guid>();
  @Output() updateStateEvent = new EventEmitter<Guid>();

  deleteTodo(id: Guid) {
    this.deleteEvent.emit(id);
  }

  updateState(id: Guid) {
    this.updateStateEvent.emit(id);
  }

}
