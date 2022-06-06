import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerBrandHistoryComponent } from './history.component';

describe('InfluencerBrandHistoryComponent', () => {
  let component: InfluencerBrandHistoryComponent;
  let fixture: ComponentFixture<InfluencerBrandHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerBrandHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerBrandHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
