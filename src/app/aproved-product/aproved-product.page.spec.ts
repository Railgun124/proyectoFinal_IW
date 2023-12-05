import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AprovedProductPage } from './aproved-product.page';

describe('AprovedProductPage', () => {
  let component: AprovedProductPage;
  let fixture: ComponentFixture<AprovedProductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AprovedProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
