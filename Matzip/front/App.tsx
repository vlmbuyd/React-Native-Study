import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
} from 'react-native';

function App() {
  const [name, setName] = useState('');

  const handleChangeInput = (text: string) => {
    console.log(text);
    setName(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>이름</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handleChangeInput}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    width: 100,
    height: 50,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
