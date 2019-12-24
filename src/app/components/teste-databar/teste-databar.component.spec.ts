import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteDatabarComponent } from './teste-databar.component';

describe('TesteDatabarComponent', () => {
  let component: TesteDatabarComponent;
  let fixture: ComponentFixture<TesteDatabarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteDatabarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteDatabarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
