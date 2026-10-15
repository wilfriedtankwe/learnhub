import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListFavorite } from './product-list-favorite';

describe('ProductListFavorite', () => {
  let component: ProductListFavorite;
  let fixture: ComponentFixture<ProductListFavorite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListFavorite],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListFavorite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
