import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.page.html',
  styleUrls: ['./cerrar-sesion.page.scss'],
})
export class CerrarSesionPage implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.logout();
    this.router.navigate(['/productos']);
  }

}
