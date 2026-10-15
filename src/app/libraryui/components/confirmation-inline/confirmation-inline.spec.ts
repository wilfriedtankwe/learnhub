import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationInline } from './confirmation-inline';

describe('ConfirmationInline', () => {
  let component: ConfirmationInline;
  let fixture: ComponentFixture<ConfirmationInline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationInline],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationInline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
