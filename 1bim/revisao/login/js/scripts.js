
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let forms = document.querySelector('#form-login');
let mensagem = document.querySelector('#mensagem');

forms.addEventListener('submit', (event) =>{
    event.preventDefault()
    mensagem.classList.remove('mensagem-suceso', 'mensagem-erro')
    if (email.value && password.value){
        mensagem.classList.add('mensagem-sucesso');
        mensagem.textContent = 'Logado com sucesso.'
    }else{
        mensagem.classList.add('mensagem-erro');
        mensagem.textContent = 'Credenciais inválidas!'
    }
})