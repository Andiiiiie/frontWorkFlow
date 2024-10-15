import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import {AuthService} from "../../../services/auth.service";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl:'login.component.html',
  // template: `
  //   <form (submit)="onSubmit()">
  //     <label>Email</label>
  //     <input [(ngModel)]="credentials.login" type="text" name="login" required />
  //
  //     <label>Password</label>
  //     <input [(ngModel)]="credentials.password" type="password" name="password" required />
  //
  //     <button type="submit">Login</button>
  //   </form>
  // `,
  imports: [FormsModule],
  providers: [AuthService]
})
export class LoginComponent {
  credentials = { login: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log(this.credentials)
    this.authService.login(this.credentials.login,this.credentials.password).subscribe({
      next: (response) => {
        this.authService.setToken(response); // Assurez-vous que cette méthode est correctement définie
        this.router.navigate(['']); // Redirige vers le dashboard après la connexion
      },
      error: (err) => {
        console.log(err)
        console.log('Erreur lors de la connexion:', err); // Gère l'erreur
        // Affichez un message d'erreur à l'utilisateur si nécessaire
      }
    });
  }
}
