export function calcularMedia(nota1, nota2){
    let somar = nota1 + nota2;
    let media = somar / 2;

    console.log(`Média do Aluno: ${media}`);
    
}

export function verificarSituacao(media){
    if(media >= 7){
        console.log('Aluno APROVADO!');
    }

    if(media < 7){
        console.log('Aluno REPROVADO!');
    }
}