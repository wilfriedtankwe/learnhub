import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Banner2 } from './banner-2';

describe('Banner2', () => {
  let component: Banner2;
  let fixture: ComponentFixture<Banner2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Banner2],
    }).compileComponents();

    fixture = TestBed.createComponent(Banner2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
