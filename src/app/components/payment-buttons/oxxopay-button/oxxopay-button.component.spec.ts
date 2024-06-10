import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OxxopayButtonComponent } from './oxxopay-button.component';

describe('OxxopayButtonComponent', () => {
  let component: OxxopayButtonComponent;
  let fixture: ComponentFixture<OxxopayButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OxxopayButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OxxopayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
