import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: User = {
    id: 0,
    email: '',
    password: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register() {
    this.user.id = Math.floor(Math.random() * 1000);

    this.http.post<User>('http://localhost:3000/users', this.user)
      .subscribe({
        next: () => {
          this.resetForm();
          this.router.navigate(['/login']);
        },
        error: () => {
          alert('Registro erróneo, vuelve a intentarlo.');
        }
      });
  }

  resetForm() {
    this.user = { id: 0, email: '', password: '' };
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}