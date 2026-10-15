import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieConsent1 } from './cookie-consent-1';

describe('CookieConsent1', () => {
  let component: CookieConsent1;
  let fixture: ComponentFixture<CookieConsent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookieConsent1],
    }).compileComponents();

    fixture = TestBed.createComponent(CookieConsent1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
