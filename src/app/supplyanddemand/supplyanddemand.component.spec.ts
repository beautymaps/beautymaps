import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyanddemandComponent } from './supplyanddemand.component';

describe('SupplyanddemandComponent', () => {
  let component: SupplyanddemandComponent;
  let fixture: ComponentFixture<SupplyanddemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyanddemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyanddemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
