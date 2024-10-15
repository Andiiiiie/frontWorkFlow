import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTypeListComponent } from './process-type-list.component';

describe('ProcessTypeListComponent', () => {
  let component: ProcessTypeListComponent;
  let fixture: ComponentFixture<ProcessTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
