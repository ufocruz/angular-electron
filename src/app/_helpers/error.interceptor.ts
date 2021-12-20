import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { ToastController } from '@ionic/angular';

// import { AuthenticationService } from '@app/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    // private toastController: ToastController
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {

      // const toastOption: any = {
      //   animated: true,
      //   // cssClass: "scanner-force",
      //   color: "danger",
      //   message: '',
      //   position: "top",
      //   duration: 3000
      // };

      let message = '';
      if (err.status === 402 || err.status === 403) {

        console.log(err)
        if (err.status === 403) {

          // toastOption.message = err.error.message || err.statusText;
          message = err.error.message || err.statusText;

        } else {
          // toastOption.message = "Sessão expirada! Por favor faça login novamente!";
          message = "Sessão expirada! Por favor faça login novamente!";
        }

        // this.toastController.create(toastOption).then(toast => {
        //   toast.present();
        alert(
          message
        );

          setTimeout(() => {
            this.authenticationService.logout();
            location.reload();
          }, 3000);
        // })
      } else {
        if (err.error?.error) {
          // toastOption.message = err.error.error;
          message = err.error.error;
          // return;
        } else {
          // toastOption.message = "Aconteceu um erro inesperado! Contate o Administrador";
          message = "Aconteceu um erro inesperado! Contate o Administrador";

          console.log(err);
        }

        // this.toastController.create(toastOption).then(toast => {
        //   toast.present();
        // });
        alert(message)

      }


      const error = err.error.message || err.statusText;


      return throwError(error);
    }))
  }
}
