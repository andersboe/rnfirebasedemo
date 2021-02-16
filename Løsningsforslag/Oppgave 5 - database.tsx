import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Pressable,
  FlatList,
} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [dishes, setDishes] = useState<{name: string; rating: string}[]>([]);
  const [dish, setDish] = useState('');
  const [rating, setRating] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(
    null,
  );

  useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      console.log('Auth change');
      setCurrentUser(user);
    });
  }, []);

  async function onCreateUserClick() {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSignInClick() {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSignOutClick() {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  }

  async function onSaveDishClick() {
    try {
      await firestore().collection('matretter').add({
        name: dish,
        rating: rating,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function onLoadDishesClick() {
    try {
      const query = await firestore().collection('matretter').get();
      const dishes = query.docs.map((doc) => {
        const data = doc.data();
        return {name: data.name, rating: data.rating};
      });

      setDishes(dishes);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.content}>
        {currentUser && (
          <View style={styles.header}>
            <Text>{`Logget inn som ${currentUser.email}`}</Text>
            <Pressable style={styles.button} onPress={onSignOutClick}>
              <Text>Logg ut</Text>
            </Pressable>
          </View>
        )}

        <Text style={styles.title}>Firebase Demo</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'E-post'}
          value={email}
          onChangeText={setEmail}
          keyboardType={'email-address'}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'Passord'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={onCreateUserClick}>
            <Text>Opprett bruker</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={onSignInClick}>
            <Text>Logg inn</Text>
          </Pressable>
        </View>

        <View style={styles.dishes}>
          <TextInput
            style={[styles.textInput, {width: 120}]}
            placeholder={'Matrett'}
            value={dish}
            onChangeText={setDish}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Rating'}
            value={rating}
            onChangeText={setRating}
            keyboardType={'decimal-pad'}
          />
          <Pressable style={styles.button} onPress={onSaveDishClick}>
            <Text>Lagre matrett</Text>
          </Pressable>
        </View>
        {dishes.length > 0 && <Text style={styles.title}>Mine matretter</Text>}
        <FlatList
          data={dishes}
          renderItem={(data) => {
            return (
              <View style={styles.dishItem}>
                <Text>{data.item.name}</Text>
                <Text>{data.item.rating}</Text>
              </View>
            );
          }}
        />
        <Pressable style={styles.button} onPress={onLoadDishesClick}>
          <Text>Hent matretter</Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    borderRadius: 15,
    backgroundColor: 'lightblue',
    alignSelf: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  dishes: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dishItem: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
