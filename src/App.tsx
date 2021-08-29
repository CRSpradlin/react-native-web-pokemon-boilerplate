import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {height} = Dimensions.get('window');
const pokeAPIs = {
  pokemon: 'https://pokeapi.co/api/v2/pokemon/',
  count: 'https://pokeapi.co/api/v2/pokemon-species/?limit=0',
};

const App = () => {
  const [count, setCount] = React.useState(0);
  const [pokeName, setPokeName] = React.useState('Click for Pokemon!');

  const incrementCount = () => {
    setCount(count + 1);
  };

  const randPokeId = (maxNum: any) => {
    return Math.floor(Math.random() * maxNum + 1);
  };
  const updateWithNewPokeId = async () => {
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
    setPokeName(pokemonRespData.name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.bottomSpacing}>Hello React Native Web!!!</Text>
        <Text>Count: {count}</Text>
        <TouchableOpacity
          style={[styles.button, styles.bottomSpacing]}
          onPress={_props => incrementCount()}>
          <Text>Click me bitch!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.bottomSpacing]}
          onPress={_props => updateWithNewPokeId()}>
          <Text>{pokeName}</Text>
        </TouchableOpacity>
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
  bottomSpacing: {
    marginBottom: 20,
  },
});

export default App;
