import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerRequestComponent } from './request.component';

describe('InfluencerRequestComponent', () => {
  let component: InfluencerRequestComponent;
  let fixture: ComponentFixture<InfluencerRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
