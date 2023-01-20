class Validator {
    constructor() {
        this.validations = [
            'data-min-length',
        ]
    }

    /**
     * Iniciar a validação de todos os inputs
     */
    validate(form) {
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
     * Método que imprime mensagens de erros na tela
     */
    printMessage (input, msg) {
        let template = document.querySelector('.error-validation').cloneNode(true);
        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);
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
