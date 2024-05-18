import styles from './PokemonComponent.module.css';

const PokemonComponent = () => {
  const getLogo = (type) => {
    // Restituisce un URL casuale per il logo
    return 'https://via.placeholder.com/50';
  };

  const getName = () => {
    // Restituisce un nome casuale
    return 'Meow';
  };

  const getHeight = () => {
    // Restituisce un'altezza casuale
    return '1.7m';
  };

  const getWeight = () => {
    // Restituisce un peso casuale
    return '90.5kg';
  };

  const getAbility = () => {
    // Restituisce un'abilità casuale
    return 'Blaze';
  };


  const getStatName = (index) => {
    // Restituisce nomi di statistiche casuali
    const stats = ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'];
    return stats[index];
  };

  const getStatWidth = (index) => {
    // Restituisce una larghezza casuale per la barra della statistica
    const widths = ['45%', '49%', '49%', '65%', '65%', '45%'];
    return widths[index];
  };

  // Dati di test per un Pokémon
  const pokemon = {
    types: [{ type: { name: 'Grass' } }],
    stats: [
      { base_stat: 45 },
      { base_stat: 49 },
      { base_stat: 49 },
      { base_stat:65 },
      { base_stat: 65 },
      { base_stat: 45 },
    ],
  };

  const image = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png';
  const color = 'lightgreen';

  return (
    <div className={styles.content} style={{ border: `2px solid ${color}` }}>
      <div>
        <div className={styles.title}>
          <div className={styles.subgrid}>
            <div className={styles.emoji}>
              <img src={getLogo(pokemon.types[0].type.name)} alt="Logo" />
            </div>
            <div className={styles.type} style={{ color: color }}>{pokemon.types[0].type.name}</div>
            <div className={styles.name}>{getName()}</div>
            <div className={styles.details}>
              <div className={styles.row}>
                <span>Height</span>
                <span>{getHeight()}</span>
              </div>
              <div className={styles.row}>
                <span>Weight</span>
                <span>{getWeight()}</span>
              </div>
              <div className={styles.row}>
                <span>Abilities</span>
                <span>{getAbility()}</span>
              </div>
            </div>
          </div>

          <div className={styles.picture}>
            <img src={image} alt="Pokemon" />
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.title}>Stats</div>
          <div className={styles.graphics}>
            {pokemon.stats.map((item, i) => (
              <div className={styles.row} key={i}>
                <div className={styles.name}>{getStatName(i)}</div>
                <div className={styles.bar}>
                  <div className={styles.inside} style={{ width: getStatWidth(i), backgroundColor: color }} ></div>
                </div>
                <div className={styles.base}>{item.base_stat}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

export default PokemonComponent;
