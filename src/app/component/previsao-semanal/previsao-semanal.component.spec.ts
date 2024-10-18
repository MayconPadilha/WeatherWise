import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisaoSemanalComponent } from './previsao-semanal.component';

describe('PrevisaoSemanalComponent', () => {
  let component: PrevisaoSemanalComponent;
  let fixture: ComponentFixture<PrevisaoSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevisaoSemanalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevisaoSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
