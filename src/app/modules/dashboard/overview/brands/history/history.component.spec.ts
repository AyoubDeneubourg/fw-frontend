import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandHistoryComponent } from './history.component';

describe('BrandHistoryComponent', () => {
  let component: BrandHistoryComponent;
  let fixture: ComponentFixture<BrandHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
