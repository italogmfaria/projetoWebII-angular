import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AluguelCarroComponent } from './aluguel-carro.component';

describe('AluguelCarroComponent', () => {
  let component: AluguelCarroComponent;
  let fixture: ComponentFixture<AluguelCarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AluguelCarroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AluguelCarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
