import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcDatabarLibComponent } from './ic-databar-lib.component';

describe('IcDatabarLibComponent', () => {
  let component: IcDatabarLibComponent;
  let fixture: ComponentFixture<IcDatabarLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcDatabarLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcDatabarLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
