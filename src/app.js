"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// URL base para acessar a PokeAPI
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
// Adiciona um ouvinte de evento ao botão de busca
document.getElementById('searchButton').addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    // Obtém o valor do campo de entrada do Pokémon, converte para minúsculas
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    // Verifica se o nome do Pokémon não está vazio
    if (pokemonName) {
        try {
            // Faz uma requisição para a API da PokeAPI para buscar o Pokémon
            const response = yield fetch(`${apiUrl}${pokemonName}`);
            // Se a resposta não for bem-sucedida, lança um erro
            if (!response.ok)
                throw new Error('Pokémon not found');
            // Converte a resposta em JSON
            const pokemon = yield response.json();
            // Exibe os detalhes do Pokémon
            displayPokemonDetails(pokemon);
        }
        catch (error) {
            // Em caso de erro (como Pokémon não encontrado), exibe uma mensagem de erro
            displayError();
        }
    }
}));
// Função para exibir os detalhes do Pokémon na página
function displayPokemonDetails(pokemon) {
    // Atualiza a imagem do Pokémon
    document.getElementById('pokemonImage').src = pokemon.sprites.front_default;
    // Atualiza o nome do Pokémon, capitalizando a primeira letra
    (document.getElementById('name').textContent) = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    // Atualiza o tipo do Pokémon, listando todos os tipos separados por vírgula
    (document.getElementById('tipo').textContent) = pokemon.types.map((t) => t.type.name).join(', ');
    // Atualiza as habilidades do Pokémon, listando todas as habilidades separadas por vírgula
    (document.getElementById('habilidades').textContent) = pokemon.abilities.map((a) => a.ability.name).join(', ');
    // Remove a classe 'hidden' para tornar os detalhes do Pokémon visíveis
    document.getElementById('pokemonDetails').classList.remove('hidden');
}
// Função para exibir uma mensagem de erro quando o Pokémon não é encontrado
function displayError() {
    // Define a imagem de erro (interrogação) quando o Pokémon não é encontrado
    document.getElementById('pokemonImage').src = 'src/img/question-mark.png';
    // Define o texto 'Não encontrado' para o nome do Pokémon
    (document.getElementById('name').textContent) = 'Não encontrado';
    // Limpa os textos dos tipos e habilidades
    (document.getElementById('tipo').textContent) = '';
    (document.getElementById('habilidades').textContent) = '';
    // Remove a classe 'hidden' para tornar a mensagem de erro visível
    document.getElementById('pokemonDetails').classList.remove('hidden');
}
