import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import AuthStackNavigator from './src/navigation/AuthStackNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AuthStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
