import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieStatComponent } from './pie-stat.component';

describe('PieStatComponent', () => {
  let component: PieStatComponent;
  let fixture: ComponentFixture<PieStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
