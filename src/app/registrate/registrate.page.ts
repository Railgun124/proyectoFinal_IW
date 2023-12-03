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

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this.registrateForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      noControl: ['', Validators.required],
      nip: ['', Validators.required],
    });
  }

  ngOnInit() {}

  async registrate() {
    if (this.registrateForm.valid) {
      const user = this.registrateForm.value;
      try {
        // Registra el usuario en Firebase Authentication
        await this.userService.register(user);

        // Agrega el usuario a la colección de usuarios en Firestore
        await this.userService.addUser(user);

        console.log('Usuario registrado exitosamente:', user);

        const toast = await this.toastController.create({
          message: 'Usuario registrado correctamente',
          duration: 2000,
          position: 'top',
        });
        toast.present();

        // Redirige a la página de inicio después del registro
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
      }
    } else {
      console.warn(
        'El formulario no es válido. Por favor, completa todos los campos requeridos.'
      );
    }
  }
}
