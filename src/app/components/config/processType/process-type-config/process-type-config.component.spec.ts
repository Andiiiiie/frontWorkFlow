import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTypeConfigComponent } from './process-type-config.component';

describe('ProcessTypeConfigComponent', () => {
  let component: ProcessTypeConfigComponent;
  let fixture: ComponentFixture<ProcessTypeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTypeConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTypeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
