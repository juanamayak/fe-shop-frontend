import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesListModalComponent } from './addresses-list-modal.component';

describe('AddressesListModalComponent', () => {
  let component: AddressesListModalComponent;
  let fixture: ComponentFixture<AddressesListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressesListModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressesListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
