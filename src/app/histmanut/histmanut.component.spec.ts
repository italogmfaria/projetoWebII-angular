import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistmanutComponent } from './histmanut.component';

describe('HistmanutComponent', () => {
  let component: HistmanutComponent;
  let fixture: ComponentFixture<HistmanutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistmanutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistmanutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
