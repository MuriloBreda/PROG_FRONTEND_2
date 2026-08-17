let tarefas = [];

async function buscarTarefas() {
    const resposta = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
    );

    const dados = await resposta.json();

    tarefas = dados.slice(0, 20);

    mostrarTarefas(tarefas);
}

function mostrarTarefas(lista) {
    const div = document.getElementById("tarefas");

    div.innerHTML = "";

    let concluidas = 0;

    lista.forEach(tarefa => {

        if (tarefa.completed) {
            concluidas++;
        }

        const item = document.createElement("div");

        item.className = tarefa.completed
            ? "tarefa concluida"
            : "tarefa pendente";

        item.innerHTML = `
                    <strong>${tarefa.title}</strong>
                    <br>
                    ${tarefa.completed ? "Concluída" : "Pendente"}
                `;

        div.appendChild(item);
    });

    document.getElementById("total").innerText =
        "Total de tarefas concluídas: " + concluidas;
}

function filtrarConcluidas() {
    const concluidas = tarefas.filter(tarefa => tarefa.completed);

    mostrarTarefas(concluidas);
}