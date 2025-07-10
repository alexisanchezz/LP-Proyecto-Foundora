import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesoroComponent } from './tesoro.component';

describe('TesoroComponent', () => {
  let component: TesoroComponent;
  let fixture: ComponentFixture<TesoroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TesoroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
