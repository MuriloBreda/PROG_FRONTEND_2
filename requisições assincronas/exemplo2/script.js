async function buscarDDD() {
    // capturar dados do html
    let dddDigitado = document.getElementById('ddd').value;
    let tabela = document.getElementById('tabela');

    tabela.innerHTML = '';

    if (!dddDigitado || dddDigitado.length > 2) {
        alert("DDD invalido!");
        return;
    }

    // fazer solicitação para a API
    try{
        const request = await fetch(`https://brasilapi.com.br/api/ddd/v1/${dddDigitado}`);

        if(!request.ok){
            alert("Erro ao fazer a busca! DDD inválido ou não existe!");
            return;

        }

        const response = await request.json();

        // andar no array construido as cidades da API
        response.cities.forEach(function(cidade){
            tabela.innerHTML += `
                <tr>
                    <td>${response.state}</td>
                    <td>${cidade}</td>
                </tr>
            `;
        });

    }catch (error) {
        console.log(error);
    }

}