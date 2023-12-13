import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsProductPage } from './comments-product.page';

describe('CommentsProductPage', () => {
  let component: CommentsProductPage;
  let fixture: ComponentFixture<CommentsProductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommentsProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
