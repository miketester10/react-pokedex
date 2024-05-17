/* eslint-disable react/prop-types */
import { useState } from "react";
function ActionComponent({ pokemonsTemp, setPokemons, setHasMore }) {
  const [search, setSearch] = useState("");
  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setPokemons(pokemonsTemp);
    setHasMore(false);

    if (value === "") {
      setPokemons(pokemonsTemp);
      setHasMore(true);
    }

    setPokemons((prev) =>
      prev.filter((pokemon) =>
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
