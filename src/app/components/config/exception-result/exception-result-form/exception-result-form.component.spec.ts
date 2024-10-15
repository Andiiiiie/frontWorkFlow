import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionResultFormComponent } from './exception-result-form.component';

describe('ExceptionResultFormComponent', () => {
  let component: ExceptionResultFormComponent;
  let fixture: ComponentFixture<ExceptionResultFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExceptionResultFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExceptionResultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
