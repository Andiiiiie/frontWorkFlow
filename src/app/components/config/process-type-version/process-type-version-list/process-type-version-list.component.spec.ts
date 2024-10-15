import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTypeVersionListComponent } from './process-type-version-list.component';

describe('ProcessTypeVersionListComponent', () => {
  let component: ProcessTypeVersionListComponent;
  let fixture: ComponentFixture<ProcessTypeVersionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTypeVersionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTypeVersionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
