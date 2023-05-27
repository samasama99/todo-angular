import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoSrcComponent } from './todo-src.component';

describe('TodoSrcComponent', () => {
  let component: TodoSrcComponent;
  let fixture: ComponentFixture<TodoSrcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoSrcComponent]
    });
    fixture = TestBed.createComponent(TodoSrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
