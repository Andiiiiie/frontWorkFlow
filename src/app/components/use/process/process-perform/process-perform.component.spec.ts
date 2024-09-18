import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPerformComponent } from './process-perform.component';

describe('ProcessPerformComponent', () => {
  let component: ProcessPerformComponent;
  let fixture: ComponentFixture<ProcessPerformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessPerformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessPerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
