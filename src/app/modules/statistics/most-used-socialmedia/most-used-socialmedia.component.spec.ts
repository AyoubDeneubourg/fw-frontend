import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostUsedSocialmediaComponent } from './most-used-socialmedia.component';

describe('MostUsedSocialmediaComponent', () => {
  let component: MostUsedSocialmediaComponent;
  let fixture: ComponentFixture<MostUsedSocialmediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostUsedSocialmediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostUsedSocialmediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
