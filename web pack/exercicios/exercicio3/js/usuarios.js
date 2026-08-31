import { buscarUsuarios } from "./api.js";

const botao = document.querySelector('#btnBuscar');
const listaUsuarios = document.querySelector('#listaUsuarios');
const mensagem = document.querySelector('#mensagem');

export function construirHTML(usuario) {
    buscarUsuarios(
        listaUsuarios.innerHTML += `
            <div>
                <h2>${usuario.name}</h2>
                <p><b>Email:</b> ${usuario.email}</p>
                <p><b>Telefone:</b> ${usuario.address.zipcode}</p>
                <p><b>Cidade:</b> ${usuario.address.city}</p>
                <p><b>Nome da Empresa:</b> ${usuario.company.name}</p>
            </div>
        `
    );
}