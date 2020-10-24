import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { DropdownService } from 'src/app/shared/service/dropdown.service';

import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';
import { RedeSocial } from 'src/app/shared/model/rede-social';
import { LinkSocial } from '../service/model/link-social';

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
  linksSociais: LinkSocial[] = [
    {
      id: 1,
      url: 'http://www.associado.com',
      icone: 'link',
      situacao: true,
      edicao: false
    },
    {
      id: 2,
      url: 'http://www.facebook.com/nomeusuario',
      icone: 'facebook-square',
      situacao: true,
      edicao: false
    },
    {
      id: 3,
      url: 'http://www.linkedin.com/in/nomeusuario',
      icone: 'linkedin-square',
      situacao: true,
      edicao: false
    },
    {
      id: 4,
      url: 'https://www.twitter.com/nomeusuario',
      icone: 'twitter',
      situacao: true,
      edicao: false
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private ddwService: DropdownService
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
      redesSociais: this.buildSociais()
    });

    this.redesSociais = this.ddwService.getRedeSocial();
    this.inicializarSelecaoLinkSocial();
    this.rdsRemovidos = new FormArray([]);
  }

  inicializarSelecaoLinkSocial() {

    this.rdsSelecionado = this.rdsOutro;
  }

  buildSociais() {

    let values = this.linksSociais.map(v => this.formBuilder.group({
      id: v.id,
      url: v.url,
      icone: v.icone,
      situacao: true,
      edicao: false
    }));

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
    console.log('SUBIMETER');
  }
}
