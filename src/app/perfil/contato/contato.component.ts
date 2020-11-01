import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DropdownService } from 'src/app/shared/service/dropdown.service';

import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';
import { RedeSocial } from 'src/app/shared/model/rede-social';
import { LinkSocial } from '../service/model/link-social';
import { UsuarioContato } from '../service/model/usuario-contato';

import { AuthenticationService } from 'src/app/login/_services/authentication.service';
import { ContatoService } from '../service/contato.service';
import { SocialService } from '../service/social.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent extends FormBasicComponent implements OnInit {
  
  rdsSelecionado: RedeSocial;
  rdsRemovidos: FormArray;

  rdsOutro: RedeSocial = {
    icone : 'link',
    nome : 'Outros'
  }
  rdsBotao: RedeSocial = {
    icone : 'plus',
    nome : 'Adicionar'
  }

  redesSociais: Observable<RedeSocial[]>;
  idUsuario: number;
  
  unsub$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private ddwService: DropdownService,
    private cttService: ContatoService,
    private solService: SocialService,
    private authenticationService: AuthenticationService
  ) {
    super();
  }

  ngOnInit() {
    document.body.style.backgroundColor = '#da4733';

    this.formulario = this.formBuilder.group({
      id: [null],
      telefone: [null],
      celular01: [null],
      celular01WS: [false],
      celular02: [null],
      celular02WS: [false],
      skype: [null],
      redeSocial: this.formBuilder.group({
        id: 0,
        url: '',
        icone: 'link',
        situacao: true,
        edicao: false
      }),
      redesSociais: new FormArray([])
    });

    this.redesSociais = this.ddwService.getRedeSocial();
    this.inicializarSelecaoLinkSocial();
    this.rdsRemovidos = new FormArray([]);

    this.idUsuario = this.authenticationService.currentUserValue.id;

    this.cttService.recuperarContato(this.idUsuario)
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        this.inicializarFormContato(retorno);
      });

    this.recuperarRedesSociais();
  }

  inicializarFormContato(contato: UsuarioContato) {
    if (contato) {
      this.formulario.patchValue({
        id: contato.id,
        telefone: contato.telefone,
        celular01: contato.celular01,
        celular01WS: contato.celular01WS,
        celular02: contato.celular02,
        celular02WS: contato.celular02WS,
        skype: contato.skype
      });
    }
  }

  inicializarSelecaoLinkSocial() {

    this.rdsSelecionado = this.rdsOutro;
  }

  buildSociais(linksSociais :LinkSocial[]) {

    let values = [];
    
    if(linksSociais){
      values = linksSociais.map(v => this.formBuilder.group({
        id: v.id,
        url: v.url,
        icone: v.icone,
        situacao: true,
        edicao: false
      }));
    }

    return this.formBuilder.array(values);
  }

  mudarRedeSocialIcone(rdSocial: RedeSocial) {

    this.rdsSelecionado = rdSocial;
  }

  atualizarLinkSocial(){

    if(this.formulario.get('redeSocial').get('url').value){
      this.formulario.get('redeSocial').patchValue({
        icone: this.rdsSelecionado.icone
      });
      (<FormArray>this.formulario.get('redesSociais')).push(this.formBuilder.group({
        id: 0,
        url: this.formulario.get('redeSocial').get('url').value,
        icone: this.formulario.get('redeSocial').get('icone').value,
        situacao: true,
        edicao: false
      }));
      this.formulario.get('redeSocial').patchValue({
          id: 0,
          url: '',
          icone: 'link',
          situacao: true,
          edicao: false
      });
      this.inicializarSelecaoLinkSocial();
    }
  }

  get redesSociaisFormGroup() {
    return this.formulario.get('redesSociais') as FormArray;
  }

  removerGroupLinkSocial(posicao){

    if(0 != (<FormArray>this.formulario.get('redesSociais')).at(posicao).get('id').value){
      (<FormArray>this.formulario.get('redesSociais')).at(posicao).patchValue({situacao:false});
      this.rdsRemovidos.push((<FormArray>this.formulario.get('redesSociais')).at(posicao));
    }
    (<FormArray>this.formulario.get('redesSociais')).removeAt(posicao);
  }

  editarGroupLinkSocial(posicao){
    (<FormArray>this.formulario.get('redesSociais')).at(posicao).patchValue({edicao:true});
  }

  atualizarGroupLinkSocial(posicao){
    (<FormArray>this.formulario.get('redesSociais')).at(posicao).patchValue({edicao:false});
  }

  submit() {
    
    for (let control of this.rdsRemovidos.controls) {
      (<FormArray>this.formulario.get('redesSociais')).push(control);
    }
    console.log(JSON.stringify(this.formulario.value))
    if(null == this.formulario.value['id']){
      this.cadastrar();
    } else {
      this.atualizar();
    }
  }

  cadastrar(){
    this.cttService.cadastrarContato(this.idUsuario, JSON.stringify(this.formulario.value))
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
        this.formulario.patchValue({id: retorno.id});
        this.recuperarRedesSociais();
      },
      (error: any) => {
        console.log(error);
      });
  }

  atualizar(){
    this.cttService.atualizarContato(this.idUsuario, JSON.stringify(this.formulario.value))
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
        this.recuperarRedesSociais();
      },
      (error: any) => {
        console.log(error);
      });
  }

  recuperarRedesSociais() {

    (<FormArray>this.formulario.get('redesSociais')).clear();

    this.solService.recuperarRedesSociais(this.idUsuario)
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
        let lista = this.buildSociais(retorno);
        for (let control of lista.controls) {
          (<FormArray>this.formulario.get('redesSociais')).push(control);
        }
      },
      (error: any) => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
