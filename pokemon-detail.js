let currentPokemonId = null;

document.addEventListener("DOMContentLoaded", () => {
    const MAX_POKEMONS = 151;
    const pokemonID = new URLSearchParams(window.location.search).get("id");
    const id = parseInt(pokemonID, 10);

    if (id < 1 || id > MAX_POKEMONS) {
        return (window.location.href = "index.html");
    }

    currentPokemonId = id;
    loadPokemon(id);
});

async function loadPokemon(id) {
    try {
        const [pokemon, pokemonSpecies] = await Promise
            .all([fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then((res) =>
                    res.json()
                ),
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                    .then((res) =>
                        res.json()
                    ),
            ]);

        const abilitiesWrapper = document.querySelector(".pokemon-detail-wrap .pokemon-detail.move");
        abilitiesWrapper.innerHTML = "";

        if(currentPokemonId === id) {
            displayPokemonDetails(pokemon);
                const flavorText = getEnglishFlavorText(pokemonSpecies);
                document.querySelector(".body3-fonts.pokemon-description").textContent = flavorText;

                const [leftArrow, rightArrow] = ["#leftArrow", "#rightArrow"].map((sel) =>
                    document.querySelector(sel)
                );
                leftArrow.removeEventListener("click", navigatePokemon);
                rightArrow.removeEventListener("click", navigatePokemon);

                if (id !== 1) {
                    leftArrow.addEventListener("click", () => {
                        navigatePokemon(id - 1);
                    });
                }
            if (id !== 151) {
                rightArrow.addEventListener("click", () => {
                    navigatePokemon(id + 1);
                });
            }

            window.history.pushState({}, "", `./detail.html?id=${id}`);
        }

        return true;
    } catch (error) {
        console.error("an error occurred while fetching pokemon data:", error);
        return false;
    }
}

async function navigatePokemon(id) {
    currentPokemonId = id;
    await loadPokemon(id);
}
const typeColors = {
    normal: "#bfbcaf",
    fire: "#ff5d4c",
    water: "#55afff",
    electric: "#fde63f",
    grass: "#8cd650",
    ice: "#96f1ff",
    fighting: "#c03028",
    poison: "#a95ea2",
    ground: "#ffe363",
    flying: "#7aa5fd",
    psychic: "#f666b3",
    bug: "#c3d220",
    rock: "#ccbd73",
    dragon: "#8975ff",
    dark: "#694e41",
    ghost: "#7975d6",
    steel: "#dac9c9",
    fairy: "#ff99ff",
}

function setElementStyles(elements, cssProperty, value) {
    elements.forEach((element) => {

    })
}