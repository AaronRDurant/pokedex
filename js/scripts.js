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
		// Ensures only objects are added
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
	
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button');
		listItem.appendChild(button);
		pokemonList.appendChild(listItem);
		button.addEventListener("click", function (event) {
			showDetails(pokemon);
		});
	}
	
	function showDetails(pokemon) {
		console.log(pokemon.name);
	}
	
	// Provides access to functions
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem
	};
})();

pokemonRepository.getAll().forEach(function(pokemon) {
	pokemonRepository.addListItem(pokemon);
});
