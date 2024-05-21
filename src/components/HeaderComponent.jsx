/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const HeaderComponent = ({ setSearch, setHasMore }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
    setSearch("");
    setHasMore(true);
  };

  return (
    <>
      <Link to="/" className="logo" onClick={handleClick}>
        <img
          src="https://1000logos.net/wp-content/uploads/2017/05/Pokemon-Logo.png"
          alt="Pokemon Logo"
          className="pokemon-logo"
          style={{ cursor: "pointer" }}
        />
      </Link>

      <div className="title">
        <img
          src="https://www.pngkey.com/png/full/144-1446994_pokeball-clipart-transparent-background-pokeball-png.png"
          alt="Pokeball"
          className="pokeball"
        />
        <h1>Pokedex</h1>
      </div>
    </>
  );
};

export default HeaderComponent;
