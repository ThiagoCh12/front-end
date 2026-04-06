let email = document.querySelector('#input-email');
let password = document.querySelector('#input-password');
let forms = document.querySelector('#form-login');
let message = document.querySelector('#message');

forms.addEventListener('submit', (e) => {
    e.preventDefault();
    message.classList.remove('mensagem-sucesso', 'mensagem-erro');
    if(email.value && password.value){
        message.classList.add('mensagem-sucesso');
        message.textContent = 'Logado com sucesso.';
    }else{
        message.classList.add('mensagem-erro');
        message.textContent = 'Credenciais inválidas.';
    }
});