import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.page.html',
  styleUrls: ['./registrate.page.scss'],
})
export class RegistratePage implements OnInit {
  registrateForm: FormGroup;

  constructor(private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController) {
    this.registrateForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      noControl: ['', Validators.required],
      nip: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async registrate() {
    if (this.registrateForm.valid) {
      const user = this.registrateForm.value;
      this.userService.addUser(user).then(async (response) => {
        if (response == "success") {
          console.log('Producto guardado exitosamente:', response);
          const toast = await this.toastController.create({
            message: 'Producto guardado correctamente',
            duration: 2000, // Duración de 2 segundos
            position: 'top', // Posición superior
          });
          toast.present();
        } else {
          console.log('Error al guardar el producto:', response);
        }
      })
        .catch((error) => {
          console.error('Error al guardar el producto:', error);
        });
    } else {
      console.warn(
        'El formulario no es válido. Por favor, completa todos los campos requeridos.'
      );
    }
    this.router.navigate(['/home']);
  }


}
