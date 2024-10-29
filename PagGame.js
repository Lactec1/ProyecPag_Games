document.addEventListener('DOMContentLoaded', function() {
    // Elementos de los filtros
    const genreFilter = document.getElementById('genre-filter');
    const platformFilter = document.getElementById('platform-filter');
    const releaseFilter = document.getElementById('release-filter');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const gamesContainer = document.querySelector('.games');

    // Cargar juegos desde JSON
    let gamesData = [];

    //fetch('games.json')
        //.then(response => response.json())
        //.then(data => {
            //gamesData = data;
            //displayGames(gamesData); // Mostrar juegos inicialmente
        //})
        //.catch(error => console.error('Error al cargar los datos de los juegos:', error));
    
        // Cargar el JSON con fetch
    fetch('games.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        gamesData = data;
        displayGames(gamesData); // Mostrar juegos inicialmente
    })
    .catch(error => {
        console.error('Error al cargar los datos de los juegos:', error);
    });
    
    // Mostrar los juegos en el contenedor
    function displayGames(games) {
        gamesContainer.innerHTML = ''; // Limpiar juegos anteriores
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');
            gameCard.innerHTML = `
                <img src="${game.image}" alt="Portada del juego">
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <p>Género: ${game.genre}</p>
                    <p>Plataforma: ${game.platform}</p>
                    <p>Año: ${game.year}</p>
                </div>
            `;
            gamesContainer.appendChild(gameCard);
        });
    }

    // Eventos de cambio para cada filtro
    genreFilter.addEventListener('change', filterGames);
    platformFilter.addEventListener('change', filterGames);
    releaseFilter.addEventListener('change', filterGames);
    searchButton.addEventListener('click', filterGames);

    // Agregar evento para detectar cuando se presiona la tecla Enter en la barra de búsqueda
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            filterGames();
        }
    });

    // Función de filtrado
    function filterGames() {
        // Valores actuales de los filtros
        const genreValue = genreFilter.value.toLowerCase();
        const platformValue = platformFilter.value.toLowerCase();
        const releaseValue = releaseFilter.value;
        const searchQuery = searchInput.value.toLowerCase();

        // Selección de todos los juegos
        const games = document.querySelectorAll('.game-card');

        // Itera sobre cada juego y aplica los filtros
        games.forEach(game => {
            // Obtiene el género, plataforma y año del juego en minúsculas
            const gameTitle = game.querySelector('.game-info h3').textContent.toLowerCase();
            const gameGenre = game.querySelector('.game-info p:nth-child(2)').textContent.split(": ")[1].toLowerCase();
            const gamePlatform = game.querySelector('.game-info p:nth-child(3)').textContent.split(": ")[1].toLowerCase();
            const gameYear = game.querySelector('.game-info p:nth-child(4)').textContent.split(": ")[1];

            // Condiciones de filtrado
            const matchesGenre = genreValue === 'todos' || gameGenre.includes(genreValue);
            const matchesPlatform = platformValue === 'todas' || gamePlatform.includes(platformValue);
            const matchesYear = releaseValue === 'todos' || gameYear === releaseValue;
            const matchesSearch = gameTitle.includes(searchQuery);

            // Muestra u oculta el juego según las coincidencias
            if (matchesGenre && matchesPlatform && matchesYear && matchesSearch) {
                game.style.display = '';
            } else {
                game.style.display = 'none';
            }
        });
    }
});