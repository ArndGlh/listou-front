import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListouComponent } from './listou.component';

describe('ListouComponent', () => {
  let component: ListouComponent;
  let fixture: ComponentFixture<ListouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
