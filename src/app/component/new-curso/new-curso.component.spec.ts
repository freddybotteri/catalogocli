import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCursoComponent } from './new-curso.component';

describe('NewCursoComponent', () => {
  let component: NewCursoComponent;
  let fixture: ComponentFixture<NewCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
