import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;
