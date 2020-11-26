import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishproductComponent } from './fishproduct.component';

describe('FishproductComponent', () => {
  let component: FishproductComponent;
  let fixture: ComponentFixture<FishproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
