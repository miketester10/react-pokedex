/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring"; // per animazioni
import { useParams } from "react-router-dom";
import styles from "./DetailsComponent.module.css";
import { LoadingComponent } from "./LoadingComponent";
import axios from "axios";

const DetailsComponent = () => {
  const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState({});

  const slideAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(100%)" },
    to: { opacity: 1, transform: "translateY(0%)" },
    config: { duration: 800 },
  });

  const { name } = useParams();
  useEffect(() => {
    const fetchPokemon = async (name) => {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
        const result = await axios(url);
        const pokemon = result.data;
        setLoading(false);
        loadPokemonDetails(pokemon);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    const dataLocalStorage = JSON.parse(localStorage.getItem("pokemonDetails"));
    if (dataLocalStorage && dataLocalStorage.name === name) {
      setLoading(false);
      setPokemonDetails(dataLocalStorage);
    } else {
      fetchPokemon(name);
    }

    // Imposta lo scroll in alto
    window.scrollTo(0, 0);
  }, []);

  const loadPokemonDetails = (pokemon) => {
    const obj = {
      name: pokemon.name,
      id: pokemon.id,
      abilities: pokemon.abilities[0].ability.name,
      types: pokemon.types,
      type: pokemon.types[0].type.name,
      image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id
        .toString()
        .padStart(3, "0")}.png`,
      logo: `https://raw.githubusercontent.com/miketester10/react-pokedex/main/src/assets/icons/${pokemon.types[0].type.name}.svg`,
      height: pokemon.height,
      weight: pokemon.weight,
    };
    setPokemonDetails(obj);
    localStorage.setItem("pokemonDetails", JSON.stringify(obj));
  };

  const colors = {
    fire: "orange",
    grass: "lightgreen",
    electric: "yellow",
    water: "#70ffea",
    ground: "darkgrey",
    rock: "grey",
    fairy: "pink",
    poison: "greenyellow",
    bug: "#94ecbe",
    dragon: "orange",
    psychic: "#7c7db6",
    flying: "#fcca46",
    fighting: "darkgrey",
    normal: "lightgrey",
    ice: "#00f2f2",
    dark: "#4f7ecf",
    ghost: "#7685a7",
    steel: "steelblue",
  };

  const getColor = (type) => {
    return colors[type];
  };
  const height = pokemonDetails.height / 10;
  const weight = pokemonDetails.weight / 10;

  const getStatName = (index) => {
    // Restituisce nomi di statistiche casuali
    const stats = [
      "HP",
      "Attack",
      "Defense",
      "Special Attack",
      "Special Defense",
      "Speed",
    ];
    return stats[index];
  };

  const getStatWidth = (index) => {
    // Restituisce una larghezza casuale per la barra della statistica
    const widths = ["45%", "49%", "49%", "65%", "65%", "45%"];
    return widths[index];
  };

  // Dati di test per un Pokémon
  const pokemon = {
    types: [{ type: { name: "Grass" } }],
    stats: [
      { base_stat: 45 },
      { base_stat: 49 },
      { base_stat: 49 },
      { base_stat: 65 },
      { base_stat: 65 },
      { base_stat: 45 },
    ],
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <animated.div className="content" style={slideAnimation}>
      <div
        className={styles.content}
        style={{ border: `2px solid ${getColor(pokemonDetails.type)}` }}
      >
        <div className={styles.number}>{`#${pokemonDetails.id
          .toString()
          .padStart(3, "0")}`}</div>
        <div>
          <div className={styles.title}>
            <div className={styles.subgrid}>
              <div className={styles.emoji}>
                <img src={pokemonDetails.logo} alt={pokemonDetails.type} />
              </div>
              <div className={styles.type}>{`${
                pokemonDetails.types[0].type.name
              }${
                pokemonDetails.types[1]
                  ? ` / ${pokemonDetails.types[1].type.name}`
                  : ""
              }`}</div>
              <div
                className={styles.name}
                style={{ color: getColor(pokemonDetails.type) }}
              >
                {pokemonDetails.name}
              </div>
              <div className={styles.details}>
                <div className={styles.row}>
                  <span>Weight</span>
                  <span>{weight} Kg</span>
                </div>
                <div className={styles.row}>
                  <span>Height</span>
                  <span style={{ textTransform: "lowercase" }}>{height} m</span>
                </div>
                <div className={styles.row}>
                  <span>Abilities</span>
                  <span>{pokemonDetails.abilities}</span>
                </div>
              </div>
            </div>

            <div className={styles.picture}>
              <img src={pokemonDetails.image} alt="Pokemon" />
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.title}>Stats</div>
            <div className={styles.graphics}>
              {pokemon.stats.map((item, i) => (
                <div className={styles.row} key={i}>
                  <div className={styles.name}>{getStatName(i)}</div>
                  <div className={styles.bar}>
                    <div
                      className={styles.inside}
                      style={{
                        width: getStatWidth(i),
                        backgroundColor: getColor(pokemonDetails.type),
                      }}
                    ></div>
                  </div>
                  <div className={styles.base}>{item.base_stat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default DetailsComponent;
