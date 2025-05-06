import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import AuthLogInComponent from './auth-log-in.component';
import { AuthService } from '../../data-access/auth.service';

describe('AuthLogInComponent', () => {
  let component: AuthLogInComponent;
  let fixture: ComponentFixture<AuthLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLogInComponent], // standalone
      providers: [
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: AuthService, useValue: { logIn: () => Promise.resolve({}) } },
        { provide: Router, useValue: { navigateByUrl: () => {} } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
