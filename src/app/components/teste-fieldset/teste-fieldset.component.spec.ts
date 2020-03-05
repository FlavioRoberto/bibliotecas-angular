import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteFieldsetComponent } from './teste-fieldset.component';

describe('TesteFieldsetComponent', () => {
  let component: TesteFieldsetComponent;
  let fixture: ComponentFixture<TesteFieldsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteFieldsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
