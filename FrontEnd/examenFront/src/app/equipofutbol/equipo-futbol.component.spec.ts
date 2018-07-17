import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoFutbolComponent } from './equipo-futbol.component';

describe('EquipoFutbolComponent', () => {
  let component: EquipoFutbolComponent;
  let fixture: ComponentFixture<EquipoFutbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoFutbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoFutbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
