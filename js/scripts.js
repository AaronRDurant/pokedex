let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function add(pokemon) {
		pokemonList.push(pokemon);
	}

	function getAll() {
		return pokemonList;
	}

	// Creates a list of buttons
	function addListItem(pokemon) {
		let pokemonList = document.querySelector('.pokemon-list');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('btn', 'btn-secondary', 'btn-block');
		button.setAttribute('data-target', '#pokedexmodal');
		button.setAttribute('data-toggle', 'modal');
		listItem.classList.add('list-group-item', 'border-0', 'bg-transparent');
		listItem.appendChild(button);
		pokemonList.appendChild(listItem);
		button.addEventListener('click', function (event) {
			showDetails(pokemon);
		});
	}

	function showDetails(pokemon) {
		loadDetails(pokemon).then(function () {
			showModal(pokemon);
		});
	}

	function loadList() {
		return fetch(apiUrl)
			.then(function (response) {
				return response.json();
			})
			.then(function (json) {
				json.results.forEach(function (item) {
					let pokemon = {
						name: item.name,
						detailsURL: item.url,
					};
					add(pokemon);
				});
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function loadDetails(item) {
		let url = item.detailsURL;
		return fetch(url)
			.then(function (response) {
				return response.json();
			})
			.then(function (details) {
				item.imageUrl = details.sprites.front_default;
				item.height = details.height;
				item.weight = details.weight;
				item.types = [];
				for (let i = 0; i < details.types.length; i++) {
					item.types.push(' ' + details.types[i].type.name);
				}
			})
			.catch(function (e) {
				console.error(e);
			});
	}

	function showModal(text) {
		let modalTitle = document.querySelector('.modal-title');
		modalTitle.innerText = text.name;

		let modalBody = document.querySelector('.modal-body');
		modalBody.innerHTML = '';

		let imageElement = document.createElement('img');
		imageElement.src = text.imageUrl;
		imageElement.classList.add('photo');

		let heightElement = document.createElement('p');
		heightElement.innerText = 'Height: ' + text.height;
		heightElement.classList.add('height');

		let weightElement = document.createElement('p');
		weightElement.innerText = 'Weight: ' + text.weight;
		weightElement.classList.add('weight');

		let typesElement = document.createElement('p');
		typesElement.innerText = 'Types: ' + text.types;
		typesElement.classList.add('types');

		modalBody.append(imageElement);
		modalBody.append(heightElement);
		modalBody.append(weightElement);
		modalBody.append(typesElement);
	}

	// Provides access to functions
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		showDetails: showDetails,
		loadList: loadList,
		loadDetails: loadDetails,
		showModal: showModal,
	};
})();

pokemonRepository.loadList().then(function () {
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
