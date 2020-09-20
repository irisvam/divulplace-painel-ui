import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormBasicComponent } from 'src/app/shared/form-basic/form-basic.component';
import { FormValidations } from 'src/app/shared/form-validatotions';
import { RegistrationService } from '../_services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormBasicComponent implements OnInit {

  registro: FormGroup;
  unsub$ = new Subject();
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private rgtService: RegistrationService
    ) { 
      super();
    }

    ngOnInit() {

      document.body.style.backgroundColor = '#d2d6de';

      this.formulario = this.formBuilder.group({
        nome: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        senha: [null, Validators.required],
        repitaSenha: [null, [Validators.required, FormValidations.equalsTo('senha')]]
      });
    }

    submit() {
      
      this.registro = this.formBuilder.group({
        name: [this.formulario.value['nome']],
        username: [this.formulario.value['email']],
        email: [this.formulario.value['email']],
        password: [this.formulario.value['senha']]
      });

      this.rgtService.cadastrarRegistro(JSON.stringify(this.registro.value))
      .pipe(takeUntil(this.unsub$))
      .subscribe(retorno => {
        console.log(retorno);
        this.router.navigate(['/login']);
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
