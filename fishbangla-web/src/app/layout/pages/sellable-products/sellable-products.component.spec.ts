import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellableProductsComponent } from './sellable-products.component';

describe('SellableProductsComponent', () => {
  let component: SellableProductsComponent;
  let fixture: ComponentFixture<SellableProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellableProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
