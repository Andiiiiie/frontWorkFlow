import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismFormComponent } from './organism-form.component';

describe('OrganismFormComponent', () => {
  let component: OrganismFormComponent;
  let fixture: ComponentFixture<OrganismFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganismFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganismFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
