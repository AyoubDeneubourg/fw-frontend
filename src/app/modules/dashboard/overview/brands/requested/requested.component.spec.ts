import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandRequestedComponent } from './requested.component';

describe('BrandRequestedComponent', () => {
  let component: BrandRequestedComponent;
  let fixture: ComponentFixture<BrandRequestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandRequestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
