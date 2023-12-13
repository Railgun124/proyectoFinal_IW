import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage  implements OnInit {
  iniciarSesionForm: FormGroup;
  public user: User[] = [];

  constructor(private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController) {
    this.iniciarSesionForm = this.formBuilder.group({
      numero_control: ['', Validators.required],
      nip: ['', Validators.required],
    });
    
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.user = users;
    });
  }

  async iniciarSesion() {
    if (this.iniciarSesionForm.valid) {
      const numero_control = this.iniciarSesionForm.value.numero_control;
      const nip = this.iniciarSesionForm.value.nip;
      let userFound = false;

      for (let i = 0; i < this.user.length; i++) {
        if (this.user[i].noControl == numero_control && this.user[i].nip == nip) {
          userFound = true;
          this.userService.login(this.user[i]).then(() => {
            this.presentToast('Credenciales Correctas');
          }).catch((error) => {
            this.presentToast('Credenciales incorrectas');
          });
          this.router.navigate(['/home']);
          break;
        }
      }

      if (!userFound) {
        this.presentToast('Credenciales incorrectas');
      }
    } else {
      console.warn('El formulario no es válido. Por favor, completa todos los campos requeridos.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }


}



