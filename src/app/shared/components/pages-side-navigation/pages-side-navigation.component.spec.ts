import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesSideNavigationComponent } from './pages-side-navigation.component';

describe('PagesSideNavigationComponent', () => {
  let component: PagesSideNavigationComponent;
  let fixture: ComponentFixture<PagesSideNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagesSideNavigationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
