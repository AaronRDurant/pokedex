let pokemonRepository = (function () {
	// Array of Pokemon objects
	let pokemonList = [
		{name: 'Pikachu', height: 0.4, types: ['electric', 'field', 'fairy']},
		{name: 'Kadabra', height: 1.3, types: ['psychic', 'human-like']},
		{name: 'Charizard', height: 1.7, types: ['fire', 'flying', 'monster', 'dragon']},
		{name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison', 'monster', 'grass']},
	];
	
	// Adds new objects to pokemonList
	function add(pokemon) {
		// Ensures only objects are added. Bonus task!!!
		if (typeof pokemon !== "object") {
			return 0;
		}
	// Pushes new objects after passing the type conditional above
	pokemonList.push(pokemon);
	}

	// Provides access to data
	function getAll() {
		return pokemonList;
	}
	
	// Provides access to functions
	return {
		add: add,
		getAll: getAll,
	};
})();

pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height > 1.3) {
	document.write(`<p> ${pokemon.name} (height: ${pokemon.height}) - Wow! That's big!</p>`);
  } else {
	document.write(`<p> ${pokemon.name} (height: ${pokemon.height}) </p>`);
  }
});
