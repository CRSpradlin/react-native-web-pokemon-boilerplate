import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

const {height} = Dimensions.get('window');
const pokeAPIs = {
  pokemon: 'https://pokeapi.co/api/v2/pokemon/',
  count: 'https://pokeapi.co/api/v2/pokemon-species/?limit=0',
};

const App = () => {
  const [pokeName, setPokeName] = React.useState('Click for Pokemon!');
  const [pokeImgUrl, setPokeImgUrl] = React.useState({
    uri: 'http://pngimg.com/uploads/pokeball/pokeball_PNG29.png',
  });

  const randPokeId = (maxNum: any) => {
    return Math.floor(Math.random() * maxNum + 1);
  };
  const updateWithNewPokemon = async () => {
    const pokeCountResp = await fetch(`${pokeAPIs.count}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const pokeCountRespData = await pokeCountResp.json();
    let pokemonResp = await fetch(
      `${pokeAPIs.pokemon}${randPokeId(pokeCountRespData.count)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const pokemonRespData = await pokemonResp.json();
    setPokeImgUrl(currState => {
      currState.uri = pokemonRespData.sprites.front_default;
      return currState;
    });
    setPokeName(pokemonRespData.name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.bottomSpacing}>Welcome to the Pokemon App!</Text>
        <TouchableOpacity
          style={[styles.button, styles.bottomSpacing]}
          onPress={_props => updateWithNewPokemon()}>
          <Text>{pokeName}</Text>
        </TouchableOpacity>
        <Image source={pokeImgUrl} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 2,
  },
  image: {
    height: 350,
    width: 350,
  },
  bottomSpacing: {
    marginBottom: 20,
  },
});

export default App;
