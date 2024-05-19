/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  LoadingComponent,
  LoadingScrollComponent,
} from "./components/LoadingComponent";
import HeaderComponent from "./components/HeaderComponent";
import BtnScrollToTop from "./components/BtnScrollToTop";
import ActionComponent from "./components/ActionComponent";
import CardsComponent from "./components/CardComponent";
import DetailsComponent from "./components/DetailsComponent";
import FooterComponent from "./components/FooterComponent";
import axios from "axios";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsTemp, setPokemonsTemp] = useState([]); // array pokemon temporaneo mi serve per reinizializzare l'array dei pokemon (pokemons) dopo il filtraggio/ricerca
  const [allPokemons, setAllPokemons] = useState([]); // array completo con tutti i pokemon ed i loro dettagli
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(true);
  const [pokemonCount, setPokemonCount] = useState(45); // all'avvio del sito voglio caricare solo 45 pokemon, poi ad ogni scroll ne carico 10 alla volta
  const [search, setSearch] = useState("");

  const max = 1025;

  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 1);
  }, []);

  useEffect(() => {
    const fetchDataFromFile = async () => {
      try {
        const response = await axios.get("/all_pokemons.json");
        setAllPokemons(response.data);
      } catch (error) {
        console.error("Error fetching the file all_pokemons.json:", error);
      }
    };

    if (wait) return;
    fetchDataFromFile();
  }, [wait]);

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
    if (pokemons[pokemons.length - 1].id >= max) {
      setHasMore(false);
      return;
    }
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
    <BrowserRouter>
      <HeaderComponent
        pokemonsTemp={pokemonsTemp}
        setPokemons={setPokemons}
        setSearch={setSearch}
        setHasMore={setHasMore}
      />
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <LoadingComponent />
            ) : (
              <>
                <ActionComponent
                  search={search}
                  pokemonsTemp={pokemonsTemp}
                  allPokemons={allPokemons}
                  setSearch={setSearch}
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
                <BtnScrollToTop />
              </>
            )
          }
        />
        <Route
          path="/details/:name"
          element={loading ? <LoadingComponent /> : <DetailsComponent />}
        />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
