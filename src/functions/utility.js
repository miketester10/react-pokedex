export const getColor = (type) => {
  let color = "";
  switch (type) {
    case "fire":
      color = "orange";
      break;
    case "grass":
      color = "lightgreen";
      break;
    case "electric":
      color = "yellow";
      break;
    case "water":
      color = "#70ffea";
      break;
    case "ground":
      color = "darkgrey";
      break;
    case "rock":
      color = "grey";
      break;
    case "fairy":
      color = "pink";
      break;
    case "poison":
      color = "greenyellow";
      break;
    case "bug":
      color = "#94ecbe";
      break;
    case "dragon":
      color = "orange";
      break;
    case "psychic":
      color = "#7c7db6";
      break;
    case "flying":
      color = "#fcca46";
      break;
    case "fighting":
      color = "darkgrey";
      break;
    case "normal":
      color = "lightgrey";
      break;
    case "ice":
      color = "#00f2f2";
      break;
    case "dark":
      color = "#4f7ecf";
      break;
    case "ghost":
      color = "#7685a7";
      break;
    case "steel":
      color = "steelblue";
      break;
  }
  return color;
};

export const getNameString = (name) => {
  if (name.includes("-")) {
    const nameSplitted = name.split("-");
    return nameSplitted.join(" ");
  }
  return name;
};

export const getPokemonType = (types) => {
  return `${types[0].type.name} ${types[1] ? ` / ${types[1].type.name}` : ""}`;
};
