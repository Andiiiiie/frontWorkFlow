import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessStatistiqueComponent } from './process-statistique.component';

describe('ProcessStatistiqueComponent', () => {
  let component: ProcessStatistiqueComponent;
  let fixture: ComponentFixture<ProcessStatistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessStatistiqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessStatistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
