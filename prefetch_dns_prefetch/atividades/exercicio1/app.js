const form = document.getElementById("formCep");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Obtém o CEP e remove caracteres não numéricos
    const cep = document.getElementById("cep").value.replace(/\D/g, "");

    if (cep.length !== 8) {
        resultado.textContent = "Digite um CEP válido com 8 números.";
        return;
    }

    resultado.textContent = "Consultando CEP...";

    try {
        // Requisição HTTP para o servidor do ViaCEP
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        if (!resposta.ok) {
            throw new Error("Erro na requisição.");
        }

        // Converte a resposta JSON para objeto JavaScript
        const dados = await resposta.json();

        if (dados.erro) {
            resultado.textContent = "CEP não encontrado.";
            return;
        }

        // Apresenta os dados retornados pela API
        resultado.textContent =
            `Rua: ${dados.logradouro} |
                Bairro: ${dados.bairro} |
                Cidade: ${dados.localidade} |
                Estado: ${dados.uf}`;

    } catch (erro) {
        resultado.textContent = "Erro ao consultar o CEP.";
        console.error(erro);
    }
});

// Prefetch esteira
const botaoEsteira = document.getElementById("btnEsteira");
let prefetchRealizadoEsteira = false;

// quando usuario passar o mouse no botão
botaoEsteira.addEventListener('mouseenter', function(){
    // Impede criar o mesmo prefetch varias vezes
    if(!prefetchRealizadoEsteira){
        return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'detalhesEsteira.html';
    link.as = 'document';

    document.head.appendChild(link);
    prefetchRealizadoEsteira = true;
    console.log('Prefetch solicitado!');
});

botaoEsteira.addEventListener('click', function(){
    window.location.href = 'detalhesEsteira.html';
});

// prefetch braço
const botaoBraco = document.getElementById("btnBraco");
let prefetchRealizadoBraco = false;

// quando usuario passar o mouse no botão
botaoBraco.addEventListener('mouseenter', function(){
    // Impede criar o mesmo prefetch varias vezes
    if(!prefetchRealizadoBraco){
        return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'detalhesBraco.html';
    link.as = 'document';

    document.head.appendChild(link);
    prefetchRealizadoBraco = true;
    console.log('Prefetch solicitado!');
});

botaoBraco.addEventListener('click', function(){
    window.location.href = 'detalhesBraco.html';
});

// prefetch prensa
const botaoPrensa = document.getElementById("btnPrensa");
let prefetchRealizadoPrensa = false;

// quando usuario passar o mouse no botão
botaoPrensa.addEventListener('mouseenter', function(){
    // Impede criar o mesmo prefetch varias vezes
    if(!prefetchRealizadoPrensa){
        return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'detalhesPrensa.html';
    link.as = 'document';

    document.head.appendChild(link);
    prefetchRealizadoPrensa = true;
    console.log('Prefetch solicitado!');
});

botaoPrensa.addEventListener('click', function(){
    window.location.href = 'detalhesPrensa.html';
});