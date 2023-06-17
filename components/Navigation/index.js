import React from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAuth0 } from '@auth0/auth0-react';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

const Index = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <View style={styles.navBar}>
      <View style={styles.logo}>
        <Link to="/">
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png',
            }}
            style={styles.navBarIcon}
          />
        </Link>
      </View>
      <View style={styles.hamburgerMenu}>
        <FontAwesomeIcon icon={faBars} />
        <Text style={styles.menuText}>Menu</Text>
      </View>
      <View style={styles.searchBar}>
        <Text style={styles.allText}>All</Text>
        <TextInput
          style={styles.searchBarInput}
          placeholder="search your fav movies"
        />
        <FontAwesomeIcon
          icon={faSearch}
          style={{ color: '#000', fontSize: 40 }}
        />
      </View>
      <View style={styles.logName}>
        {isAuthenticated && <Text>Welcome {user.name}</Text>}
        {console.log(user)}
      </View>
      {isAuthenticated ? (
        <View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => loginWithRedirect()}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  logo: {
    flex: 1,
  },
  navBarIcon: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  hamburgerMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  allText: {
    marginRight: 10,
  },
  searchBarInput: {
    flex: 1,
    height: 40,
  },
  logName: {
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    
  },
  loginButtonText: {
    fontSize: 16,
  },
});

export default Index;

