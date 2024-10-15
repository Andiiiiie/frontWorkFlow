import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Injection du service d'authentification
  const router = inject(Router); // Injection du router pour la redirection

  const isAuthenticated = authService.isAuthenticated();
  console.log("veriry"+isAuthenticated)
  if(!isAuthenticated)
  {
    router.navigate(['/login']);
    return false
  }
  // Vérification de l'authentification

  // if (!isAuthenticated) {
  //   // Si l'utilisateur n'est pas authentifié, redirection vers la page de login
  //   router.navigate(['/login']);
  //   return false;
  // }

  // Si l'utilisateur est authentifié, accès autorisé
  return true;
};
