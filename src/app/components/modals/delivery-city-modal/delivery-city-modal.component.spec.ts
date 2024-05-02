import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryCityModalComponent } from './delivery-city-modal.component';

describe('DeliveryCityModalComponent', () => {
  let component: DeliveryCityModalComponent;
  let fixture: ComponentFixture<DeliveryCityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryCityModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryCityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
