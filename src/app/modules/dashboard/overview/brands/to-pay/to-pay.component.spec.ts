import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandToPayComponent } from './to-pay.component';

describe('BrandToPayComponent', () => {
  let component: BrandToPayComponent;
  let fixture: ComponentFixture<BrandToPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandToPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
