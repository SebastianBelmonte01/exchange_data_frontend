import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyPageableComponent } from './currency-pageable.component';

describe('CurrencyPageableComponent', () => {
  let component: CurrencyPageableComponent;
  let fixture: ComponentFixture<CurrencyPageableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyPageableComponent]
    });
    fixture = TestBed.createComponent(CurrencyPageableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
