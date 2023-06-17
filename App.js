import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import Navigation from './components/Navigation'
import Home from './components/Home';
import MovieList from './components/MovieList';

function App() {
  return (
    
    <View style={styles.container}>
      hello
      <NativeRouter>
        <Navigation />
        <Route path="/" exact component={Home} />
        <Route path="/movie/:id" component={MovieList} />
        <Route path="*" element={<Text>This is an error Page</Text>} />
      </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;

