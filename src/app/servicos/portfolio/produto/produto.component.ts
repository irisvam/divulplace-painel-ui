import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { ProdutoService } from '../service/produto.service';
import { ServicoProduto } from '../service/model/servico-produto';
import { AuthenticationService } from 'src/app/login/_services/authentication.service';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  modalProduto: BsModalRef;
  idUsuario: number;
  idSelecionado = 0;
  produtos$: Observable<ServicoProduto[]>;
  
  constructor(
    private modalService: BsModalService,
    private altService: AlertModalService,
    private cstProduto: ProdutoService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.idUsuario = this.authenticationService.currentUserValue.id;
    this.onRefresh();
  }

  onRefresh() {
    this.produtos$ = this.cstProduto.recuperarProdutos(this.idUsuario)
    .pipe(
      catchError(error => {
        console.log(error);
        this.altService.showAlertDanger('Erro ao carregar serviços!');
        return EMPTY;
      })
      );
  }

  openModal(tpltProduto: TemplateRef<any>, id : number) {
    this.idSelecionado = id;
    this.modalProduto = this.modalService.show(
      tpltProduto, 
      Object.assign({}, { ignoreBackdropClick: true, class: 'gray modal-lg'})
    );
  }

  onDelete(id : number) {
    const result$ = this.altService.showConfirm('Confirmar','Deseja deletar o Produto?');
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.cstProduto.deletarProduto(id) : EMPTY)
      ).subscribe(
        success => {
          this.onRefresh();
          this.altService.showAlertSuccess('Produto deletado com sucesso!');
        },
        error => {
          this.altService.showAlertWarning('Erro ao tentar deletar Produto!');
        }
      );
  }

}
