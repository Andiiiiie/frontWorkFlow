import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MenuComponent} from "./components/global/menu/menu.component";
import {NavbarComponent} from "./components/global/navbar/navbar.component";
import {AuthService} from "./services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, NavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontWorkFlow';

  constructor(private router: Router,private authService:AuthService) {
    // Vérifiez si l'utilisateur est connecté ou redirigez vers la page de login
    // const isLoggedIn = false; // Remplacez par votre logique de vérification de l'authentification
    // console.log("aona"+isLoggedIn);
    //
    // if (!isLoggedIn) {
    //   this.router.navigate(['/login']);
    // }
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }
}
export const API_URL = 'http://localhost:8080';

