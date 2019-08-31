import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

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

  rdsOutro: RedeSocial = {
    id : 0,
    icone : 'link',
    nome : 'Outros'
  }
  rdsBotao: RedeSocial = {
    id : 0,
    icone : 'plus',
    nome : 'Adicionar'
  }

  redesSociais: Observable<RedeSocial[]>;
  linksSociais: LinkSocial[] = [
    {
      id: 1,
      url: 'http://www.associado.com',
      icone: 'link'
    },
    {
      id: 2,
      url: 'http://www.facebook.com/nomeusuario',
      icone: 'facebook-square',
    },
    {
      id: 3,
      url: 'http://www.linkedin.com/in/nomeusuario',
      icone: 'linkedin-square'
    },
    {
      id: 4,
      url: 'https://www.twitter.com/nomeusuario',
      icone: 'twitter',
    }
  ];

  linkSocialSelecionado: LinkSocial;

  constructor(
    private formBuilder: FormBuilder,
    private ddwService: DropdownService
  ) {
    super();
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id: [null],
      telefone: [null],
      celular01: [null],
      celular01WS: [false],
      celular02: [null],
      celular02WS: [false],
      skype: [null],
      redesSociais: this.buildSociais()
    });

    this.redesSociais = this.ddwService.getRedeSocial();
    this.rdsSelecionado = this.rdsOutro;
    this.linkSocialSelecionado = {
      id: 0,
      url: '',
      icone: this.rdsSelecionado.icone
    }

    console.log(this.formulario.get('redesSociais'));
  }

  buildSociais() {

    let values = this.linksSociais.map(v => this.formBuilder.group({
      id: v.id,
      url: v.url,
      icone: v.icone
    }));

    return this.formBuilder.array(values);
  }

  mudarRedeSocialIcone(rdSocial: RedeSocial) {
    this.rdsSelecionado = rdSocial;
  }

  atualizarListaLinkSocial(input) {
    this.linkSocialSelecionado.url = input.value;
    this.linkSocialSelecionado.icone = this.rdsSelecionado.icone;

    this.linksSociais.push(this.linkSocialSelecionado);
    console.log(this.linksSociais);
    
    input.value = '';
    this.rdsSelecionado = this.rdsOutro;
  }

  submit() {
    throw new Error("Method not implemented.");
  }
}
