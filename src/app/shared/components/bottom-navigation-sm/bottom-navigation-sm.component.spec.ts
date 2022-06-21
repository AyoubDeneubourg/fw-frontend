import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigationSmComponent } from './bottom-navigation-sm.component';

describe('BottomNavigationSmComponent', () => {
  let component: BottomNavigationSmComponent;
  let fixture: ComponentFixture<BottomNavigationSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomNavigationSmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavigationSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
