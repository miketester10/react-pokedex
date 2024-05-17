/* eslint-disable react/prop-types */
import { useState } from "react";

function ActionComponent({
  pokemonsTemp,
  allPokemons,
  setPokemons,
  setHasMore,
}) {
  const [search, setSearch] = useState("");
  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setHasMore(false);

    if (value === "") {
      setPokemons(pokemonsTemp);
      const last_pokemon_id = pokemonsTemp.slice(-1)[0].id;
      if (last_pokemon_id !== 1025) {
        setHasMore(true);
      }
      return;
    }

    setPokemons(
      allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(value.toLowerCase())
      )
    );
  };

  return (
    <div className="poke-container action-component">
      <div className="search-container">
        <input
          onChange={handleOnChange}
          value={search}
          type="text"
          className="search-input"
          placeholder="Search Pokemon.."
        />
      </div>
    </div>
  );
}

export default ActionComponent;
