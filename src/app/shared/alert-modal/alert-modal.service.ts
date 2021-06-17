import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './alert-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCES = 'success',
  WARNING = 'warning'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private mdlService: BsModalService) { }
  
  private showAlert(type:AlertTypes, message:string) {
    const modalAlert: BsModalRef = this.mdlService.show(AlertModalComponent);
    modalAlert.content.type = type;
    modalAlert.content.message = message;
  }

  showAlertDanger(message:string){
    this.showAlert(AlertTypes.DANGER, message);
  }

  showAlertSuccess(message:string){
    this.showAlert(AlertTypes.SUCCES, message);
  }

  showAlertWarning(message:string){
    this.showAlert(AlertTypes.WARNING, message);
  }

  showConfirm(title:string, message:string){
    const modalConfirm: BsModalRef = this.mdlService.show(ConfirmModalComponent,
    Object.assign({}, { class: 'gray modal-sm' }));
    modalConfirm.content.title = title;
    modalConfirm.content.message = message;

    return (<ConfirmModalComponent>modalConfirm.content).confirmResult;
  }

}
