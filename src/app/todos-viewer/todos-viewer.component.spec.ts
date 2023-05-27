import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosViewerComponent } from './todos-viewer.component';

describe('TodosViewerComponent', () => {
  let component: TodosViewerComponent;
  let fixture: ComponentFixture<TodosViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosViewerComponent]
    });
    fixture = TestBed.createComponent(TodosViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
