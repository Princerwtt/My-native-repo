import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Cards = () => {
  // State variables
  const [movies, setMovies] = useState([]); // Stores the movie data
  const [selectedMovie, setSelectedMovie] = useState(null); // Stores the currently selected movie

  // Fetch movies data from API when component mounts
  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=ebab107d0e771faee711646843039664&language=en-US'
    )
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => setMovies(data.results)) // Set the movies state with the fetched data
      .catch((error) => console.log(error)); // Log any errors that occur during the fetch
  }, []);

  // Handle click event when a movie is selected
  const handleClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Popular Movies</Text>
      <View style={styles.movieList}>
        {/* Map over the movies array and create a TouchableOpacity for each movie */}
        {movies.map((movie) => (
          <TouchableOpacity
            key={movie.id} // Set the unique key for each movie
            onPress={() => handleClick(movie)} // Set the selected movie when pressed
            style={styles.cards}
          >
            <View style={styles.movieOverlay}>
              <Text style={styles.infoCardTitle}>{movie.title}</Text>
              {/* <Text style={styles.infoCardRealeaseDate}>{movie.release_date}</Text> */}
              <Text style={styles.rating}>Rating: {movie.vote_average}</Text>
              {/* <Text style={styles.movieDescription}>{movie.overview}</Text> */}
            </View>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w300/${movie.poster_path}` }}
              style={styles.posterImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  movieList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cards: {
    width: '48%',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  movieOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  infoCardTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoCardRealeaseDate: {
    color: '#fff',
    marginBottom: 5,
  },
  rating: {
    color: '#fff',
    marginBottom: 5,
  },
  movieDescription: {
    color: '#fff',
  },
  posterImage: {
    width: '100%',
    height: 200,
  },
});

export default Cards;
