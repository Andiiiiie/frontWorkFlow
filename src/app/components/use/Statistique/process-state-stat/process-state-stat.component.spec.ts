import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessStateStatComponent } from './process-state-stat.component';

describe('ProcessStateStatComponent', () => {
  let component: ProcessStateStatComponent;
  let fixture: ComponentFixture<ProcessStateStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessStateStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessStateStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
