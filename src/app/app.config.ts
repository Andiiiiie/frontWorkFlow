import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withHashLocation} from '@angular/router';

import { routes } from './app.routes';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
// import {JwtInterceptor} from "@auth0/angular-jwt";
import {jwtInterceptorFn} from "./auth/jwt-interceptor.interceptor";

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideAnimationsAsync(),
//     importProvidersFrom(HttpClientModule),
//     ResultTypeService, provideAnimationsAsync()
//   ],
//
// };
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    // // Ajout de l'interceptor JWT
    // importProvidersFrom(HttpClientModule),
    // {
    //   provide: HttpClientModule,
    //   useValue: withInterceptors([jwtInterceptorFn]), // Ajout de l'interceptor JWT
    // }
    provideHttpClient(withInterceptors([jwtInterceptorFn]))
  ]
};
