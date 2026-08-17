let postagens = [];

const pesquisa = document.getElementById("pesquisa");
const postagensDiv = document.getElementById("postagens");
const quantidade = document.getElementById("quantidade");
const mensagem = document.getElementById("mensagem");

async function buscarPostagens() {

    mensagem.textContent = "Carregando postagens...";

    try {

        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar postagens");
        }

        postagens = await resposta.json();

        mostrarPostagens(postagens);

    } catch (erro) {

        mensagem.textContent = "Erro ao carregar as postagens.";

    }
}

function mostrarPostagens(lista) {

    postagensDiv.innerHTML = "";

    quantidade.textContent = lista.length;

    if (lista.length === 0) {
        mensagem.textContent = "Nenhuma postagem encontrada.";
        return;
    }

    mensagem.textContent = "";

    lista.forEach(post => {

        const card = document.createElement("div");

        card.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <hr>
                `;

        postagensDiv.appendChild(card);
    });
}

pesquisa.addEventListener("input", function () {

    const texto = pesquisa.value.toLowerCase();

    const resultados = postagens.filter(post =>
        post.title.toLowerCase().includes(texto)
    );

    mostrarPostagens(resultados);
});