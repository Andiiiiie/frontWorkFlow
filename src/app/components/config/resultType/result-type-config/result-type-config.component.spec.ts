import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTypeConfigComponent } from './result-type-config.component';

describe('ResultTypeConfigComponent', () => {
  let component: ResultTypeConfigComponent;
  let fixture: ComponentFixture<ResultTypeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultTypeConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultTypeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
