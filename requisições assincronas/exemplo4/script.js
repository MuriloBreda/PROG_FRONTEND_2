const botao = document.querySelector('#btnBuscar');
const campoPokemon = document.querySelector('#nome');
const resultado = document.querySelector('#resultado');

botao.addEventListener('click', buscarPokemon);

function buscarPokemon() {
    const nome = campoPokemon.value.toLowerCase();

    resultado.innerHTML = 'Buscando Pokémon...';

    fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)
        .then(resposta => resposta.json())
            .then(pokemon => {
                resultado.innerHTML = `
                    <h2>${pokemon.name}</h2>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <p><b>Tipo:</b> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                    <p><b>Altura:</b> ${pokemon.height}</p>
                    <p><b>Peso:</b> ${pokemon.weight}</p>

                    <br>
                    <h3>Habilidades:</h3>
                    ${pokemon.abilities.map(ability => `<p>${ability.ability.name}</p>`).join('')}

                    <br>
                    <h3>Eveoluções:</h3>
                    ${pokemon.species.url ? `<p><a href="${pokemon.species.url}" target="_blank">Clique aqui para ver as evoluções</a></p>` : '<p>Não há informações sobre evoluções.</p>'}
                    
                    
                `;
            })
            
            .catch(erro => {
                resultado.innerHTML = 'Pokémon não encontrado.';
                conseole.log(erro);
            });
}

