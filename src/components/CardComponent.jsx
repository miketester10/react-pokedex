/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CardsComponent({ pokemons }) {
  return (
    <div className="poke-container">
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
}

function PokemonCard({ pokemon }) {
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
  
  const mainTypes = Object.keys(colors);
  const name =
    pokemon.name[0].toUpperCase() + pokemon.name.slice(1) || pokemon.name;
  const id = pokemon.id.toString().padStart(3, "0") || pokemon.id;
  const pokeTypes = pokemon.types.map((typeKind) => typeKind.type.name);
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
  const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);
  const color = colors[type];
  const height = pokemon.height / 10;
  const weight = pokemon.weight / 10;

  const getPokemonType = (pokeTypes) => {
    if (pokeTypes.length == 1) {
      const pokeType = pokeTypes[0][0].toUpperCase() + pokeTypes[0].slice(1);
      return pokeType;
    } else {
      const pokeType1 = pokeTypes[0][0].toUpperCase() + pokeTypes[0].slice(1);
      const pokeType2 = pokeTypes[1][0].toUpperCase() + pokeTypes[1].slice(1);
      return `${pokeType1} / ${pokeType2}`;
    }
  };

  return (
    <div
      className="pokemon"
      style={{ border: `2px solid ${color}`, cursor: "default" }}
    >
      <span className="number">#{id}</span>
      <span
        className="type-icon"
        title={type}
        style={{
          backgroundColor: color,
          boxShadow: `0 0 6px ${color}`,
        }}
      ></span>

      <div className="img-container">
        <Link to={`/details/${pokemon.name}`}>
          <LazyLoadImage
            alt={name}
            effect="opacity-transform"
            src={image}
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>
      <div className="info">
        <h3 className="name">{name}</h3>

        <div className="extra-info">
          <div>
            <small>Weight</small>
            <h5 className="weight">{weight} kg</h5>
          </div>
          <div>
            <small>Height</small>
            <h5 className="height">{height} m</h5>
          </div>
        </div>

        <div className="type-data">
          <small>Type:</small>
          <h5 className="type"> {getPokemonType(pokeTypes)}</h5>
        </div>
      </div>
    </div>
  );
}

export default CardsComponent;
