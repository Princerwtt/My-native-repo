import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';

const MovieList = () => {
  const [movie, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=ebab107d0e771faee711646843039664&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.movieIntro}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/original${movie ? movie.backdrop_path : ''}` }}
          style={styles.movieIntroImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.movieDetail}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ''}` }}
          style={styles.movieDetailImage}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.movieName}>{movie ? movie.original_title : ''}</Text>
      <Text style={styles.vote}>Vote: {movie ? movie.vote_average : ''}</Text>
      <Text style={styles.tag}>{movie ? movie.tagline : ''}</Text>
      <Text style={styles.releaseDate}>Release Date: {movie ? movie.release_date : ''}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  movieIntro: {
    height: 200,
  },
  movieIntroImage: {
    flex: 1,
  },
  movieDetail: {
    marginTop: 10,
    alignItems: 'center',
  },
  movieDetailImage: {
    width: 150,
    height: 225,
  },
  movieName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  vote: {
    marginTop: 5,
    textAlign: 'center',
  },
  tag: {
    marginTop: 5,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  releaseDate: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default MovieList;
