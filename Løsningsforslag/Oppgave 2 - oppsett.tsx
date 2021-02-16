import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Pressable,
} from 'react-native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onCreateUserClick() {}

  function onSignInClick() {}

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.content}>
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
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
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
