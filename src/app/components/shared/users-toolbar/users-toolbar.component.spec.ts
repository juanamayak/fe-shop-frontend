import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersToolbarComponent } from './users-toolbar.component';

describe('UsersToolbarComponent', () => {
  let component: UsersToolbarComponent;
  let fixture: ComponentFixture<UsersToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
