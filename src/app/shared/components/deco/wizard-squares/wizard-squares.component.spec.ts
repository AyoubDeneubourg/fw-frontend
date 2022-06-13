import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardSquaresComponent } from './wizard-squares.component';

describe('WizardSquaresComponent', () => {
  let component: WizardSquaresComponent;
  let fixture: ComponentFixture<WizardSquaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WizardSquaresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardSquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
