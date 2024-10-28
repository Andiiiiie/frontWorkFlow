import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerTokenFormComponent } from './consumer-token-form.component';

describe('ConsumerTokenFormComponent', () => {
  let component: ConsumerTokenFormComponent;
  let fixture: ComponentFixture<ConsumerTokenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerTokenFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerTokenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
