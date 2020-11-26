import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishMenuComponent } from './fish-menu.component';

describe('FishMenuComponent', () => {
  let component: FishMenuComponent;
  let fixture: ComponentFixture<FishMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
