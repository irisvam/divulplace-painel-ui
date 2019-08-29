import { FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

    static cepValidator(control: FormControl) {
        
        const cep = control.value;

        if (cep && cep !== '') {
            const validaCep = /^[0-9]{8}$/;
            return validaCep.test(cep) ? null : { valid : false };
        }

        return null;
    }

    static equalsTo(otherFiled: string) {
        const validator = (formControl: FormControl) => {
            if (!otherFiled) {
                throw new Error('É necessário informar um campo!');
            }
            
            if (!formControl.root || !(<FormGroup> formControl.root).controls) {
                return null;
            }

            const field = (<FormGroup> formControl.root).get(otherFiled);

            if (!field) {
                throw new Error('É necessário informar um campo válido!');
            }

            return field.value == formControl.value ? null : { equalsTo : otherFiled };
        };

        return validator;
    }

    static getErrorMessage(fieldName: string, validatorName: string, validatorValue?: any) {

        const config = {
            'required': `${fieldName} é obrigatório!`,
            'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres!`,
            'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres!`,
            'email': `${fieldName} inválido!`,
            'pattern': `${fieldName} incorreto!`,
            'equalsTo': `${fieldName} não confere!`
        }

        return config[validatorName];
    }
}