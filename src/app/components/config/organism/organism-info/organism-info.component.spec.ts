import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismInfoComponent } from './organism-info.component';

describe('OrganismInfoComponent', () => {
  let component: OrganismInfoComponent;
  let fixture: ComponentFixture<OrganismInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganismInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganismInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
