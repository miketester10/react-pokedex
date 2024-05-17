/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

function ActionComponent({
  pokemonsTemp,
  pokemonsName,
  setPokemons,
  setHasMore,
}) {
  const [search, setSearch] = useState("");
  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setPokemons(pokemonsTemp);
    setHasMore(false);

    if (value === "") {
      setPokemons(pokemonsTemp);
      const last_pokemon_id = pokemonsTemp.slice(-1)[0].id;
      if (last_pokemon_id !== 1025) {
        setHasMore(true);
      }
    }

    setPokemons((prev) => {
      const newArray = prev.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(value.toLowerCase())
      );
      // pokemonsName.forEach(async (p) => {
      //   if (p.toLowerCase().startsWith(value.toLowerCase())) {
      //     try {
      //       const url = `https://pokeapi.co/api/v2/pokemon/${p}`;
      //       const result = await axios(url);
      //       const pokemons = result.data
      //       console.log(pokemons)

      //     } catch (error) {
      //       console.error("Error fetching Pokemon:", error);
      //     }
      //   }
      // });

      return newArray;
    });
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
