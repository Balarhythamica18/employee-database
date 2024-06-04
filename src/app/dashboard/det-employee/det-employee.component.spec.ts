import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetEmployeeComponent } from './det-employee.component';

describe('DetEmployeeComponent', () => {
  let component: DetEmployeeComponent;
  let fixture: ComponentFixture<DetEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetEmployeeComponent]
    });
    fixture = TestBed.createComponent(DetEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
