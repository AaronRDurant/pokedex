let pokemonList = [
	{name: 'Pikachu', height: 0.4, types: ['electric', 'field', 'fairy']},
	{name: 'Kadabra', height: 1.3, types: ['psychic', 'human-like']},
	{name: 'Charizard', height: 1.7, types: ['fire', 'flying', 'monster', 'dragon']},
	{name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison', 'monster', 'grass']},
]

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1.3) {
	document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + " - Wow! That's big!" + "</p>");
  } else {
	document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + "</p>");
  }
}
