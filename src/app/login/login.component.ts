import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    this.http.get<User[]>('http://localhost:3000/users')
      .subscribe(users => {
        const user = users.find(u => u.email === this.email && u.password === this.password);
        if (user) {
          this.router.navigate(['/home']);
        } else {
          alert('Datos incorrectos. Verifica tu correo y contraseña.');
        }
      });
  }
}