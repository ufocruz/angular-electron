import { FormGroup, FormBuilder } from '@angular/forms';
import { IpcService } from './../_services/ipc.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-impressoras',
  templateUrl: './impressoras.component.html',
  styleUrls: ['./impressoras.component.scss']
})
export class ImpressorasComponent implements OnInit {
  printersForm: FormGroup;
  currentUser: any;
  printers: any[] = [];
  text: string = "vazio";
  impressoraEtiqueta: any = '';
  impressoraA4: any = '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private zone: NgZone,
    private readonly _ipc: IpcService
  ) {
    const impressoraEtiqueta = localStorage.getItem('impressoraEtiqueta');
    this.impressoraEtiqueta = impressoraEtiqueta?? '';

    const impressoraA4 = localStorage.getItem('impressoraA4');
    this.impressoraA4 = impressoraA4 ?? '';

    this.printersForm = this.formBuilder.group({
      impressoraEtiqueta: [this.impressoraEtiqueta],
      impressoraA4: [this.impressoraA4]
    });

  }

  ngOnInit(): void {
    this.loading = true;
    this.currentUser = this.authenticationService.currentUserValue;
    this._ipc.on('printers-listed', (event: Electron.IpcRendererEvent, ...printers: any[]) => {

      console.log(printers[0]);
      this.zone.run(() => {
        this.printers = printers[0];

        if(this.impressoraEtiqueta || this.impressoraA4) {
          this.sendPrintersToMain();
        }

        this.loading = false;
      });
    });

    this._ipc.send('printers-view');
  }

  onChange($event: any, tipoImpressora: string) {
    this.loading = true;
    console.log($event)
    console.log(tipoImpressora)
    if($event?.target?.value) {
      if(tipoImpressora == 'a4') {
        this.impressoraA4 = $event.target.value;
        localStorage.setItem('impressoraA4', this.impressoraA4);
      } else {
        this.impressoraEtiqueta =  $event.target.value;
        localStorage.setItem('impressoraEtiqueta', this.impressoraEtiqueta);
      }

      this.sendPrintersToMain();
      this.loading = false;

    }
  }

  sendPrintersToMain() {
    this._ipc.send('printers-selected', [{impressoraEtiqueta: this.impressoraEtiqueta, impressoraA4: this.impressoraA4}]);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
