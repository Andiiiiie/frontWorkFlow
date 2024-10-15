import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTypeVersionConfigComponent } from './process-type-version-config.component';

describe('ProcessTypeVersionConfigComponent', () => {
  let component: ProcessTypeVersionConfigComponent;
  let fixture: ComponentFixture<ProcessTypeVersionConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTypeVersionConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTypeVersionConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
