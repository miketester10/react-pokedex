/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ActionComponent = ({
  search,
  pokemons,
  allPokemons,
  setPokemonsFiltered,
  setHasMore,
  setSearch,
}) => {
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearch(value);
    setHasMore(false);

    if (value === "") {
      const last_pokemon_id = pokemons.slice(-1)[0].id;
      if (last_pokemon_id !== 1025) {
        setHasMore(true);
      }
      return;
    }

    setPokemonsFiltered(
      allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(value.toLowerCase())
      )
    );
  };

  return (
    <div className="poke-container action-component">
      <div className="search-container">
        <input
          onChange={handleSearchInput}
          value={search}
          type="text"
          className="search-input"
          placeholder="Search Pokemon.."
        />
        {search != "" && (
          <button
            onClick={() => handleSearchInput({ target: { value: "" } })}
            className="btn-clear"
          >
            <FontAwesomeIcon
              icon={faTimes}
              color={"#818080ad"}
              style={{ fontSize: "20px", fontWeight: "bold" }}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionComponent;
