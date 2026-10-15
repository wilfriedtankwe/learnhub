import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestimonyPerson } from './testimony-person';

describe('TestimonyPerson', () => {
  let component: TestimonyPerson;
  let fixture: ComponentFixture<TestimonyPerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonyPerson],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonyPerson);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
