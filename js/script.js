class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validation',
            'data-only-letras',
            'data-equal',
        ]
    }

    /**
     * Iniciar a validação de todos os inputs
     */
    validate(form) {

        /**
         * Resgatar todas as validações
         */
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        /**
         * Pegar todos os inputs do formulário
         */
        let inputs = form.getElementsByTagName('input');

        /**
         * Transformo uma HTMLCollection -> Array de todos os inputs
         */
        let inputsArray = [...inputs];

        /**
         * Loop nos inputs e validação mediante ao que for encontrado
         */
        inputsArray.forEach(function (input) {
            /**
             * Loop em todas as minhas validações existentes
             */
            for (let i = 0; this.validations.length > i; i++) {
                /**
                 * Verifica se a validação atual existe no input
                 */
                if (input.getAttribute(this.validations[i]) != null) {
                    /**
                     * Limpando a string para virar um método
                     */
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    /**
                     * Valor do atributo data-min-length criado
                     */
                    let value = input.getAttribute(this.validations[i]);

                    /**
                     * Invocar o método
                     */
                    this[method](input, value);
                }
            }
        }, this);
    }

    /**
     * Verifica se dois campos são iguais
     * @param {} input 
     */
    equal(input, inputName) {
        
        let passwordToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Senhas diferentes!`;

        if(input.value != passwordToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    /**
     * Nome só pode receber letras
     */
    onlyletras(input){
        /**
         * Regex para apenas aceitar letras
         */
        let regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números nem caracteres especiais`;

        if(!regex.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    /**
     * Validação de email
     * @param {} input 
     */
    emailvalidation(input){
        /**
         * email@email.com -> email@email.com.br
         */
        let regex = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail no padrão rafaeldamasceno@gmail.com`;

        if(!regex.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }


    required(input) {
        let inputValue = input.value;

        if (inputValue === '') {
            let errorMessage = 'Este campo é obrigatório';
            this.printMessage(input, errorMessage);
        }
    }

    /**
     * Verificar se um input tem um número mínimo de caracteres
     */
    minlength(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo ao menos ${minValue} caracteres`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    /**
     * Verificar se um input passou do máximo de caracteres
     */
    maxlength(input, maxValue) {
        let inputLength = input.value.length;

        let errorMessage = `O campo pode ter menos que ${maxValue} caracteres`;

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    /**
     * Método que imprime mensagens de erros na tela
     */
    printMessage(input, msg) {

        /**
         * Verificar quantos erros existe em um input
         */
        let errorQtd = input.parentNode.querySelector('.error-validation');

        if (errorQtd === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }

    /**
     * Limpa as validações da tela
     * @param {} validations 
     */
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

}



let form = document.getElementById('register-form');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

/**
 * Evento que dispara as validações
 */
submit.addEventListener('click', function (e) {
    e.preventDefault();

    validator.validate(form);
});
