import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './_services/authentication.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: any;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private electronService: ElectronService,
    private translate: TranslateService
  ) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    this.translate.setDefaultLang('en');
    console.log('environment', environment);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
