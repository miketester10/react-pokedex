/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring"; // per animazioni
import { useParams } from "react-router-dom";
import styles from "./DetailsComponent.module.css";
// import { LoadingComponent } from "./LoadingComponent";
import LoadingDetailsComponent from "./LoadingDetailsComponent";
import NotFoundPageComponent from "./NotFoundPageComponent";
import axios from "axios";
import { getColor, getNameString, getPokemonType } from "../functions/utility";

const DetailsComponent = () => {
  const [loading, setLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [error404, setError404] = useState(false);

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
        setTimeout(() => setLoading(false), 1000); // setLoading(false);
        loadPokemonDetails(pokemon);
      } catch (error) {
        if (error.response.status === 404) {
          setLoading(false);
          setError404(true);
          return;
        }
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
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`,
      logo: `https://raw.githubusercontent.com/miketester10/react-pokedex/main/src/assets/icons/${pokemon.types[0].type.name}.svg`,
      height: pokemon.height,
      weight: pokemon.weight,
      stats: pokemon.stats,
    };
    setPokemonDetails(obj);
    localStorage.setItem("pokemonDetails", JSON.stringify(obj));
  };

  const height = pokemonDetails.height / 10;
  const weight = pokemonDetails.weight / 10;

  const getAbilitiesString = (abilities) => {
    if (abilities.includes("-")) {
      const abilitiesSplitted = abilities.split("-");
      return abilitiesSplitted.join(" ");
    }
    return abilities;
  };

  const getStatNameString = (statName) => {
    if (statName.includes("-")) {
      const name = statName.split("-").join(" ");
      return name;
    }
    return statName;
  };

  const getStatWidth = (base_stat) => {
    const total = 255;
    return `${(base_stat / total) * 100}%`;
  };

  return loading ? (
    <LoadingDetailsComponent />
  ) : error404 ? (
    <NotFoundPageComponent />
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
              <div className={styles.type}>
                {getPokemonType(pokemonDetails.types)}
              </div>
              <div
                className={styles.name}
                style={{ color: getColor(pokemonDetails.type) }}
              >
                {getNameString(pokemonDetails.name)}
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
                  <span>{getAbilitiesString(pokemonDetails.abilities)}</span>
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
              {pokemonDetails.stats.map((elemento, index) => (
                <div className={styles.row} key={index}>
                  <div className={styles.name}>
                    {getStatNameString(elemento.stat.name)}
                  </div>
                  <div className={styles.bar}>
                    <div
                      className={styles.inside}
                      style={{
                        width: getStatWidth(elemento.base_stat),
                        backgroundColor: getColor(pokemonDetails.type),
                      }}
                    ></div>
                  </div>
                  <div className={styles.base}>{elemento.base_stat}</div>
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
