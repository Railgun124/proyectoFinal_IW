import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss', '../../assets/output.css'],
})
export class HomePage {
  public imageUrl = '../public/imgs/logo.png';

  constructor() {}

}
