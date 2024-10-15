import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidProcessTypeListComponent } from './valid-process-type-list.component';

describe('ValidProcessTypeListComponent', () => {
  let component: ValidProcessTypeListComponent;
  let fixture: ComponentFixture<ValidProcessTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidProcessTypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidProcessTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
