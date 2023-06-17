import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import Carousel from "react-native-snap-carousel";
// import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel';
import Cards from "../Cards";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=ebab107d0e771faee711646843039664&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results))
      .catch((error) =>
        console.error("Error fetching popular movies:", error)
      );
  }, []);

  const renderCarouselItem = ({ item }) => (
    <Link
      key={item.id}
      style={styles.carouselLink}
      to={`/movie/${item.id}`}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}` }}
        style={styles.carouselImage}
        resizeMode="cover"
      />
      <View style={styles.carouselOverlay}>
        <Text style={styles.carouselTitle}>{item.original_title}</Text>
        <Text style={styles.carouselRuntime}>
          {item.release_date}
          <Text style={styles.carouselRating}>
            {item.vote_average}
            <Text style={styles.starIcon}> &#9733;</Text>
          </Text>
        </Text>
        <Text style={styles.carouselDescription}>{item.overview}</Text>
      </View>
    </Link>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={popularMovies}
        renderItem={renderCarouselItem}
        sliderWidth={400}
        itemWidth={300}
        loop={true}
        autoplay={true}
        autoplayInterval={3000}
        showsPagination={false}
      />
      <Cards />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  carouselLink: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: 200,
  },
  carouselOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  carouselTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  carouselRuntime: {
    color: "#fff",
    marginBottom: 5,
  },
  carouselRating: {
    color: "#fff",
  },
  starIcon: {
    fontFamily: "FontAwesome",
  },
  carouselDescription: {
    color: "#fff",
  },
});
export default Home;
