function enviarFormulario(event) {

    // Travar envio do formulário do HTML
    event.preventDefault();

    // Capturar os valores do HTML
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let telefone = document.getElementById("telefone").value;
    let cargo = document.getElementById("cargo").value;

    // Capturar os elementos das mensagens de erro
    let erroNome = document.getElementById("erroNome");
    let erroCpf = document.getElementById("erroCpf");
    let erroTelefone = document.getElementById("erroTelefone");
    let erroCargo = document.getElementById("erroCargo");

    // Exibir os valores no console
    console.log("Nome: " + nome);
    console.log("CPF: " + cpf);
    console.log("Telefone: " + telefone);
    console.log("Cargo: " + cargo);

    // Validação dos campos
    if (!nome) {
        Swal.fire({
            title: "Atenção!",
            text: "O campo Nome é obrigatório!",
            icon: "warning",

        });

        // Colocar a mensagem em vermelho no campo
        document.getElementById("nome").classList.add('campo-erro');
        erroNome.textContent = "O campo Nome é obrigatório!";
        document.getElementById("nome").focus();

        return;
    }

    if (!cpf) {
        Swal.fire({
            title: "Atenção!",
            text: "O campo CPF é obrigatório!",
            icon: "warning",

        });

        // Colocar a mensagem em vermelho no campo
        document.getElementById("cpf").classList.add('campo-erro');
        erroCpf.textContent = "O campo CPF é obrigatório!";
        document.getElementById("cpf").focus();

        return;
    }

    if (!telefone) {
        Swal.fire({
            title: "Atenção!",
            text: "O campo Telefone é obrigatório!",
            icon: "warning",

        });

        // Colocar a mensagem em vermelho no campo
        document.getElementById("telefone").classList.add('campo-erro');
        erroTelefone.textContent = "O campo Telefone é obrigatório!";
        document.getElementById("telefone").focus();

        return;
    }

    if (!cargo) {
        Swal.fire({
            title: "Atenção!",
            text: "O campo Cargo é obrigatório!",
            icon: "warning",

        });

        // Colocar a mensagem em vermelho no campo
        document.getElementById("cargo").classList.add('campo-erro');
        erroCargo.textContent = "O campo Cargo é obrigatório!";
        document.getElementById("cargo").focus();

        return;
    }

    Swal.fire({
        title: "Sucesso!",
        text: "Dados Enviados!",
        icon: "success",

    });
}