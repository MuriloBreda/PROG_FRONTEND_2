// Capturar elementos html
const formulario = document.querySelector('#formCep');
const campoCep = document.querySelector('#cep');
const mensagem = document.querySelector('#mensagem');
const resultado = document.querySelector('#resultado');

// Criando ação no click do formulario
formulario.addEventListener('submit', consultarCep);

// Criar função para busca as informações do cep
async function consultarCep(event) {
    // Travar envio do html
    event.preventDefault();

    // Remove tudo que não for número
    const cep = campoCep.value.replace(/\D/g, '');

    // verificar se o cep tem 8 numeros
    if (cep.length != 8) {
        mensagem.textContent = 'Digite um CEP com 8 números.';
        return;
    }

    mensagem.textContent = 'Consultando CEP...';

    // Fazer consulta na API ViaCEP

    try {
        // Faz a busca
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        // verifica se a solicitação deu certa
        if (!resposta.ok) {
            console.log('Erro ao buscar CEP');
            return;
        }

        // pega a resposta da api e transforma em json
        const endereco = await resposta.json();

        if (endereco.erro) {
            console.log('CEP inválido');
            mensagem.textContent = 'CEP inválido.';
            return;
        }

        console.log(endereco);

        // Mostra na tela os dados da api q foram buscados
        document.getElementById('logradouro').textContent = endereco.logradouro;
        document.getElementById('bairro').textContent = endereco.bairro;
        document.getElementById('cidade').textContent = endereco.localidade;
        document.getElementById('estado').textContent = endereco.estado;

        // retirar o hidden do resultado
        resultado.hidden = false;
        mensagem.textContent = 'Endereço encontrado!';

    }catch (error) {
        mensagem.textContent = erro.message;
        console.log(error);
    }
}