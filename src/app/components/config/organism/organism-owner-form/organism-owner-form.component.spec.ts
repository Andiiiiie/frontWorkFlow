import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismOwnerFormComponent } from './organism-owner-form.component';

describe('OrganismOwnerFormComponent', () => {
  let component: OrganismOwnerFormComponent;
  let fixture: ComponentFixture<OrganismOwnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganismOwnerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganismOwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
