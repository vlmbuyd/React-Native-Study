import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import {AuthStackParamList} from '../navigation/AuthStackNavigator';
import {authNavigations} from '../constants';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인으로 이동"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
