import validator from 'validator';

export default class Contato{
    constructor(formClassContato){
this.form2 = document.querySelector(formClassContato);
    }
    init(){
this.events();
    }

    events(){
        if(!this.form2) return;
        this.form2.addEventListener('submit',e =>{
        e.preventDefault();
        this.validate(e);
        });
    
    }
    validate(e){
    const el = e.target;
    const nomeInput = el.querySelector('input[name="nome"]');
    const EmailInput = el.querySelector('input[name="email"]');
    const telefoneInput = el.querySelector('input[name="telefone"]');
    let error = false;

    if(!nomeInput.value ){
        alert('Nome é um campo obrigatório.');
        error = true;
        }


    if(!validator.isEmail(EmailInput.value) && !telefoneInput.value){
    alert('E-mail inválido');
    error = true;
    }
    
    if(!telefoneInput.value && !EmailInput.value){
        alert('Pelo menos um contato precisa ser enviado : E-mail ou telefone.');
        error = true;
        }


if(!error) el.submit();
    
 }
}


