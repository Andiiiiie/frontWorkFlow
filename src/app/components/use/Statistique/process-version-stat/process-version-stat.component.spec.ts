import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessVersionStatComponent } from './process-version-stat.component';

describe('ProcessVersionStatComponent', () => {
  let component: ProcessVersionStatComponent;
  let fixture: ComponentFixture<ProcessVersionStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessVersionStatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessVersionStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
