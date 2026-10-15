import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesDashboard } from './courses-dashboard';

describe('CoursesDashboard', () => {
  let component: CoursesDashboard;
  let fixture: ComponentFixture<CoursesDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
