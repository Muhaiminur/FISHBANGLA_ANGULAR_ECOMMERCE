import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAuctionComponent } from './product-auction.component';

describe('ProductAuctionComponent', () => {
  let component: ProductAuctionComponent;
  let fixture: ComponentFixture<ProductAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
