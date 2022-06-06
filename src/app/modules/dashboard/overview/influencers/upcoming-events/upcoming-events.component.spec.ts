import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerUpcomingEventsComponent } from './upcoming-events.component';

describe('InfluencerUpcomingEventsComponent', () => {
  let component: InfluencerUpcomingEventsComponent;
  let fixture: ComponentFixture<InfluencerUpcomingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluencerUpcomingEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerUpcomingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
