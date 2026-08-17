const botao = document.querySelector('#btnConsultar');
const input = document.querySelector('#usuarioID');
const resultado = document.querySelector('#resultado');

botao.addEventListener('click', buscarID);

function buscarID() {
    resultado.textContent = 'Buscando usuário...';

    fetch(`https://jsonplaceholder.typicode.com/users/${input.value}`)
        .then(resposta => resposta.json())
            .then(usuario => {
                resultado.innerHTML = `
                    <h2>Informações do Usuário</h2>
                    <p><strong>Nome:</strong> ${usuario.name}</p>
                    <p><strong>Email:</strong> ${usuario.email}</p>
                    <p><strong>Telefone:</strong> ${usuario.phone}</p>
                    <p><strong>Cidade:</strong> ${usuario.address.city}</p>
                    <p><strong>Empresa:</strong> ${usuario.company.name}</p>
                `;
            })
            .catch(erro => {
                resultado.textContent = 'Erro ao buscar usuário.';
                console.log(erro);
            });
}