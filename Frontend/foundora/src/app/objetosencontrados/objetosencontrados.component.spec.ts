import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetosencontradosComponent } from './objetosencontrados.component';

describe('ObjetosencontradosComponent', () => {
  let component: ObjetosencontradosComponent;
  let fixture: ComponentFixture<ObjetosencontradosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObjetosencontradosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjetosencontradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
