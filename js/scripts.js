let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	
	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	function getAll() {
		return pokemonList;
	}
	
	function addListItem(pokemon) {
		let list = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('button');
		listItem.appendChild(button);
		list.appendChild(listItem);
		button.addEventListener("click", function (event) {
		showDetails(pokemon);
		});
		}
	
	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function (json) {
			json.results.forEach(function (item) {
				let pokemon = {
					name: item.name,
					detailsURL: item.url
				};
				add(pokemon);
				console.log(pokemon);
			});
		}).catch(function (e) {
			console.error(e);
		});
	}
	
	function loadDetails(item) {
		let url = item.detailsURL;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
			// Now details are added to the item...
			item.imageURL = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types;
		}).catch(function (e) {
			console.error(e);
		});
	}
	
	function showDetails(item) {
		pokemonRepository.loadDetails(item).then(function () {
			console.log(item);
		});
	}
	
	// Provides access to functions
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showDetails: showDetails
	};
})();

pokemonRepository.loadList().then(function() {
	// Now the data is loaded
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
