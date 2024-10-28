import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Injection du service d'authentification
  const router = inject(Router); // Injection du router pour la redirection
  const expectedRole=route.data['role'];
  const isAuthenticated = authService.isAuthenticated();
  console.log("veriry"+isAuthenticated)
  if(!isAuthenticated )
  {
    router.navigate(['/login']);
    return false
  }
  if(expectedRole!=null && authService.getUserRole()!==expectedRole)
  {
    router.navigate(['/no-access']);
    return false
  }

  // Si l'utilisateur est authentifié, accès autorisé
  return true;
};
