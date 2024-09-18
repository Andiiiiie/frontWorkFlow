import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTypeValidListComponent } from './process-type-valid-list.component';

describe('ProcessTypeValidListComponent', () => {
  let component: ProcessTypeValidListComponent;
  let fixture: ComponentFixture<ProcessTypeValidListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTypeValidListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTypeValidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
