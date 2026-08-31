// Pegando elementos do HTML com querySelector
const botao = document.querySelector('#btnBuscar');
const listaUsuarios = document.querySelector('#listaUsuarios');
const mensagem = document.querySelector('#mensagem');

// Adicionando evento de clique ao botão
botao.addEventListener('click', buscarUsuarios);

// Função para buscar usuários
export function buscarUsuarios() {
    console.log('Entrou na Função');

    mensagem.textContent = 'Carregando Usuários...';

    listaUsuarios.innerHTML = '';

    // Fazendo a requisição para a API
    fetch('https://jsonplaceholder.typicode.com/users')
        // recevendo a resposta da API e convertendo para JSON
        .then(resposta => resposta.json())

        // recebe os dados ja convertidos em JSON
        .then(usuarios => {
            usuarios.forEach(usuario => {
                listaUsuarios.innerHTML += `
                    <div>
                        <hr>
                        <h2>${usuario.name}</h2>
                        <p><b>Email:</b> ${usuario.email}</p>
                        <p><b>Telefone:</b> ${usuario.address.zipcode}</p>
                        <p><b>Cidade:</b> ${usuario.address.city}</p>
                        <p><b>Nome da Empresa:</b> ${usuario.company.name}</p>
                    </div>
                `;

                // mudar mensagem
                mensagem.textContent = `${usuarios.length} usuários encontrados.`;
            })
        })

        // faz tratamento de erro
        .catch(erro => {
            mensagem.textContent = 'Não foi possível carregar os usuários.';
            console.log(erro);
        });

}    
