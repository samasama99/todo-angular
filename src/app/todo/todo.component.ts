import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  @Input() todo: Todo | undefined = undefined;
  @Input() index: number = 0;

  @Output() deleteEvent = new EventEmitter<Guid>();
  @Output() updateStateEvent = new EventEmitter<Guid>();

  deleteTodo(id: Guid) {
    this.deleteEvent.emit(id);
  }
  updateState(id: Guid) {
    this.updateStateEvent.emit(id);
  }

}
