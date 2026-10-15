import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesDashboardPage } from './courses-dashboard-page';

describe('CoursesDashboardPage', () => {
  let component: CoursesDashboardPage;
  let fixture: ComponentFixture<CoursesDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesDashboardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesDashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
