import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuuTruComponent } from './luu-tru.component';

describe('LuuTruComponent', () => {
  let component: LuuTruComponent;
  let fixture: ComponentFixture<LuuTruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuuTruComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuuTruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
