import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistcarroComponent } from './histcarro.component';

describe('HistcarroComponent', () => {
  let component: HistcarroComponent;
  let fixture: ComponentFixture<HistcarroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistcarroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistcarroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
