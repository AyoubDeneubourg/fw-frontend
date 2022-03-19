import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavbarsComponent } from './main-navbars.component';

describe('MainNavbarsComponent', () => {
  let component: MainNavbarsComponent;
  let fixture: ComponentFixture<MainNavbarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNavbarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
