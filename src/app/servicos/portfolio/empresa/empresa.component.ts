import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/login/_services/authentication.service';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { EmpresaService } from '../service/empresa.service';
import { ServicoEmpresa } from '../service/model/servico-empresa';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  modalEmpresa: BsModalRef;
  idUsuario: number;
  idSelecionado = 0;
  empresas$: Observable<ServicoEmpresa[]>;
  srcVideo: SafeResourceUrl[];
  
  constructor(
    private modalService: BsModalService,
    private altService: AlertModalService,
    private empService: EmpresaService,
    private authenticationService: AuthenticationService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    document.body.style.backgroundColor = '#222d32';

    this.idUsuario = this.authenticationService.currentUserValue.id;
    this.onRefresh();
  }

  openModal(tpltEmpresa: TemplateRef<any>, id : number) {
    this.idSelecionado = id;
    this.modalEmpresa = this.modalService.show(
      tpltEmpresa,
      Object.assign({}, { ignoreBackdropClick: true, class: 'gray modal-lg' })
    );
  }

  onDelete(id : number) {
    const result$ = this.altService.showConfirm('Confirmar','Deseja deletar a Empresa?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.empService.deletarEmpresa(id) : EMPTY)
      ).subscribe(
        success => {
          this.onRefresh();
          this.altService.showAlertSuccess('Empresa deletado com sucesso!');
        },
        error => {
          this.altService.showAlertWarning('Erro ao tentar deletar Empresa!');
        }
      );
  }

  onRefresh() {
    this.srcVideo = [];
    this.empresas$ = this.empService.recuperarEmpresas(this.idUsuario)
    .pipe(
      map(item => { 
        item.forEach(element => {
          this.srcVideo.push(this.sanitizer.bypassSecurityTrustResourceUrl(element.urlVideo));
        });
        return item;
      }),
      catchError(error => {
        console.log(error);
        this.altService.showAlertDanger('Erro ao carregar empresas!');
        return EMPTY;
      })
      );
  }

  updateListaEmpresas(icAltualizar: boolean) {
    if(icAltualizar){
      this.onRefresh();
    }
  }
}
