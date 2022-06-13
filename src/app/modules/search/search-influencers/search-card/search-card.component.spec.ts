import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInfluencerCardComponent } from './search-card.component';

describe('SearchInfluencerCardComponent', () => {
  let component: SearchInfluencerCardComponent;
  let fixture: ComponentFixture<SearchInfluencerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchInfluencerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInfluencerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
