import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineStatComponent } from './line-stat.component';

describe('LineStatComponent', () => {
  let component: LineStatComponent;
  let fixture: ComponentFixture<LineStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
