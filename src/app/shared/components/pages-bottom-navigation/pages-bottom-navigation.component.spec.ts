import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesBottomNavigationComponent } from './pages-bottom-navigation.component';

describe('PagesBottomNavigationComponent', () => {
  let component: PagesBottomNavigationComponent;
  let fixture: ComponentFixture<PagesBottomNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagesBottomNavigationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesBottomNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
