import * as React from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  LayoutChangeEvent,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const pokeAPIs = {
  pokemon: 'https://pokeapi.co/api/v2/pokemon/',
  count: 'https://pokeapi.co/api/v2/pokemon-species/?limit=0',
};

const App = () => {
  let [pokeName, setPokeName] = React.useState('Click for Pokemon!');
  let [pokeImgUrl, setPokeImgUrl] = React.useState({
    uri: 'https://pngimg.com/uploads/pokeball/pokeball_PNG29.png',
  });
  let [test, setTest] = React.useState(
    <View style={width >= 875 ? styles.leftPaneLarge : styles.leftPaneSmall}>
      <Text>{width}</Text>
    </View>,
  );

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
    let pokeCountRespData = await pokeCountResp.json();
    let pokemonResp = await fetch(
      `${pokeAPIs.pokemon}${randPokeId(pokeCountRespData.count)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    let pokemonRespData = await pokemonResp.json();
    setPokeImgUrl({
      uri: pokemonRespData.sprites.front_default,
    });
    setPokeName(pokemonRespData.name);
  };

  const shouldForceUpdate = (props: LayoutChangeEvent) => {
    if (props.nativeEvent.layout.width >= 1200) {
      setTest(
        <View style={styles.leftPaneLarge}>
          <Text>{width}</Text>
        </View>,
      );
    } else {
      setTest(
        <View style={styles.leftPaneSmall}>
          <Text>{width}</Text>
        </View>,
      );
    }
  };

  return (
    <View onLayout={props => shouldForceUpdate(props)} style={styles.container}>
      {test}
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
    flexDirection: 'row',
  },
  leftPaneLarge: {
    flex: 1,
    backgroundColor: 'grey',
  },
  leftPaneSmall: {
    display: 'none',
  },
  center: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 2,
  },
  image: {
    height: 300,
    width: 300,
  },
  bottomSpacing: {
    marginBottom: 20,
  },
});

export default App;
