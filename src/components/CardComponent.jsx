/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getColor, getNameString, getPokemonType } from "../functions/utility";

const CardsComponent = ({ pokemons, pokemonsFiltered, search }) => {
  const pokemons_array = search ? pokemonsFiltered : pokemons;
  return (
    <div className="poke-container">
      {pokemons_array.map((pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
};

const PokemonCard = ({ pokemon }) => {
  const id = pokemon.id.toString().padStart(3, "0") || pokemon.id;
  const types = pokemon.types;
  const type = pokemon.types[0].type.name;
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`;
  const height = pokemon.height / 10;
  const weight = pokemon.weight / 10;

  return (
    <div
      className="pokemon"
      style={{ border: `2px solid ${getColor(type)}`, cursor: "default" }}
    >
      <span className="number">#{id}</span>
      <span
        className="type-icon"
        title={type}
        style={{
          backgroundColor: getColor(type),
          boxShadow: `0 0 6px ${getColor(type)}`,
        }}
      ></span>

      <div className="img-container">
        <Link to={`/details/${pokemon.name}`}>
          <LazyLoadImage
            alt={pokemon.name}
            effect="opacity-transform"
            src={image}
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>
      <div className="info">
        <h3 className="name">{getNameString(pokemon.name)}</h3>

        <div className="extra-info">
          <div>
            <small>Weight</small>
            <h5 className="weight">{weight} Kg</h5>
          </div>
          <div>
            <small>Height</small>
            <h5 className="height">{height} m</h5>
          </div>
        </div>

        <div className="type-data">
          <small>Type:</small>
          <h5 className="type"> {getPokemonType(types)}</h5>
        </div>
      </div>
    </div>
  );
};

export default CardsComponent;
