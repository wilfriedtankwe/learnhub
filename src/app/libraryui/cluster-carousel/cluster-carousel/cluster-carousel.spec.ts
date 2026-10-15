import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClusterCarousel } from './cluster-carousel';

describe('ClusterCarousel', () => {
  let component: ClusterCarousel;
  let fixture: ComponentFixture<ClusterCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClusterCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(ClusterCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
