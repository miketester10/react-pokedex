/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  LoadingComponent,
  LoadingScrollComponent,
} from "./components/LoadingComponent";
import HeaderComponent from "./components/HeaderComponent";
import ActionComponent from "./components/ActionComponent";
import CardsComponent from "./components/CardComponent";
import FooterComponent from "./components/FooterComponent";
import axios from "axios";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsTemp, setPokemonsTemp] = useState([]); // array pokemon temporaneo mi serve per reinizializzare l'array dei pokemon (pokemons) dopo il filtraggio/ricerca
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(true);
  const [pokemonCount, setPokemonCount] = useState(45); // all'avvio del sito voglio caricare solo 45 pokemon, poi ad ogni scroll ne carico 10 alla volta

  const max = 1025;

  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 1);
  });

  useEffect(() => {
    const fetchPokemons = async () => {
      const array_pokemons = [];
      for (let i = 1; i <= pokemonCount; i++) {
        try {
          const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
          const result = await axios(url);
          const pokemon = result.data;
          array_pokemons.push(pokemon);
        } catch (error) {
          console.error("Error fetching Pokemon:", error);
        }
      }
      setLoading(false);
      setPokemons(array_pokemons);
      setPokemonsTemp(array_pokemons);

      localStorage.setItem(
        "pokemon",
        JSON.stringify(
          array_pokemons.map((e) => ({
            name: e.name,
            id: e.id,
            types: e.types,
            image: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${e.id
              .toString()
              .padStart(3, "0")}.png`,
            height: e.height,
            weight: e.weight,
          }))
        )
      );
    };

    const dataLocalStorage = localStorage.getItem("pokemon");
    if (dataLocalStorage && JSON.parse(dataLocalStorage).length > 0) {
      setPokemons(JSON.parse(dataLocalStorage));
      setPokemonsTemp(JSON.parse(dataLocalStorage));
      setLoading(false);
    } else {
      if (wait) return;
      fetchPokemons();
    }
  }, [wait]);

  const loadMore = () => {
    setPokemonCount((prev) => {
      const newCount = prev + 10;
      const increment = newCount - 9;

      setTimeout(async () => {
        const array_pokemons_scroll = [];
        for (let i = increment; i <= newCount; i++) {
          try {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            const result = await axios(url);
            const pokemon = result.data;
            if (pokemon.id === max) {
              array_pokemons_scroll.push(pokemon);
              setHasMore(false);
              break;
            }
            array_pokemons_scroll.push(pokemon);
          } catch (error) {
            console.error("Error fetching Pokemon:", error);
          }
        }

        setPokemons((prev) => [...prev, ...array_pokemons_scroll]);
        setPokemonsTemp((prev) => [...prev, ...array_pokemons_scroll]);

      }, 1000);

      return newCount;
    });
  };

  return (
    <>
      <HeaderComponent />
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <ActionComponent
            pokemonsTemp={pokemonsTemp}
            setPokemons={setPokemons}
            setHasMore={setHasMore}
          />
          <CardsComponent pokemons={pokemons} />
          <InfiniteScroll
            dataLength={pokemons.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<LoadingScrollComponent />}
            endMessage={
              <p style={{ textAlign: "center", color: "white" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          ></InfiniteScroll>
          <FooterComponent />
        </>
      )}
    </>
  );
}

export default App;
