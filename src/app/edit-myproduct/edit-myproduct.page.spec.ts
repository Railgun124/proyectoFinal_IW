import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMyproductPage } from './edit-myproduct.page';

describe('EditMyproductPage', () => {
  let component: EditMyproductPage;
  let fixture: ComponentFixture<EditMyproductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditMyproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
