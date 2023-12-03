import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  user: any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Suscríbete al observable authState para rastrear el estado de autenticación
    this.userService.getAuthState().subscribe(user => {
      this.isAuthenticated = !!user;
      this.user = user; // Guarda información adicional del usuario si es necesario
    });
  }

  // Añade una función para cerrar sesión
  logout() {
    this.userService.logout().then(() => {
      // Redirige a la página de inicio después de cerrar sesión
      this.router.navigate(['/cerrar-sesion']);
    });
  }
}