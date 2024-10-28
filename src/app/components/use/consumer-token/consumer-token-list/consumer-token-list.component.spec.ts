import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerTokenListComponent } from './consumer-token-list.component';

describe('ConsumerTokenListComponent', () => {
  let component: ConsumerTokenListComponent;
  let fixture: ComponentFixture<ConsumerTokenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsumerTokenListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerTokenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
