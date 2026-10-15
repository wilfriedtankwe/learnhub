import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CallToAction1 } from './call-to-action-1';

describe('CallToAction1', () => {
  let component: CallToAction1;
  let fixture: ComponentFixture<CallToAction1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallToAction1],
    }).compileComponents();

    fixture = TestBed.createComponent(CallToAction1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
