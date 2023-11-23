import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss', '../../assets/output.css'],
})
export class HomePage {
  public imageUrl = '../public/imgs/logo.png';

  constructor() {}

}
