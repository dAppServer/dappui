import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetheanComponent } from './lethean.component';

describe('LetheanComponent', () => {
  let component: LetheanComponent;
  let fixture: ComponentFixture<LetheanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetheanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetheanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
