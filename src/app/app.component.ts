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
  isAdmin = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Suscríbete al observable authState para rastrear el estado de autenticación
    this.userService.getAuthState().subscribe(user => {
      const email = user?.email || '';
      this.userService.setUserEmail(email);
      this.isAuthenticated = !!user;
      this.user = user; // Guarda información adicional del usuario si es necesario
      if(this.user.uid === "HIPaegVIAKO51sUXBCLASz0IiIv1") {
        this.isAdmin = true;
      }
    });
  }

  // Añade una función para cerrar sesión
  logout() {
    this.isAdmin = false;
    this.router.navigate(['/cerrar-sesion']);
  }
}