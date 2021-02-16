import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Pressable,
} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

declare const global: {HermesInternal: null | {}};

const App = () => {
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
});

export default App;
