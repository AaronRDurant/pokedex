let pokemonRepository = (function () {
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	let modalContainer = document.querySelector('#modal-container');
	
	function getAll() {
		return pokemonList;
	}
	
	function add(pokemon) {
		if (typeof(pokemon) === 'object') {
			pokemonList.push(pokemon);
		} else {
			console.log('Invalid data was entered');
		}
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
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types;
		}).catch(function (e) {
			console.error(e);
		});
	}
	
	function showModal(item) {
		// Clears existing content in modal
		modalContainer.innerHTML = '';
		
		let modal = document.createElement('div');
		modal.classList.add('modal');
		
		// Adds new content to modal
		let closeButtonElement = document.createElement('button');
		closeButtonElement.classList.add('closed-modal');
		closeButtonElement.innerText = 'Close';
		closeButtonElement.addEventListener('click', hideModal);
		
		let titleElement = document.createElement('h1');
		titleElement.innerText = item.name;
		
		let heightElement = document.createElement('p');
		heightElement.innerText = `Height: ${item.height}`;
		
		let imageElement = document.createElement('img');
		imageElement.src = item.imageUrl;
		
		modal.appendChild(closeButtonElement);
		modal.appendChild(titleElement);
		modal.appendChild(heightElement);
		modal.appendChild(imageElement);
		modalContainer.appendChild(modal);
		
		modalContainer.classList.add('is-visible');
	}
	
	function hideModal() {
		modalContainer.classList.remove('is-visible');
	}
	
	function showDetails(item) {
		pokemonRepository.loadDetails(item).then(function () {
			showModal(item);
		});
	}
	
	window.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	});
	
	modalContainer.addEventListener('click', (e) => {
		// So closing the modal container is only closed if the user clicks directly on the overlay
		let target = e.target;
		if (target === modalContainer) {
			hideModal();
		}
	});
	
	// Provides access to functions
	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem,
		loadList: loadList,
		loadDetails: loadDetails,
		showModal: showModal,
		hideModal: hideModal,
	};
})();

pokemonRepository.loadList().then(function() {
	// Now the data is loaded
	pokemonRepository.getAll().forEach(function (pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});
