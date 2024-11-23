import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import InputForm from "../components/InputForm";
import TodoItem from "../components/TodoItem";
import { useSelector } from "react-redux";
import { Todo } from "../redux/slices/todoSlice";
import { RootState } from "../redux/store";
import { getAuth, signOut } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import {
  createComponentForStaticNavigation,
  useNavigation,
} from "@react-navigation/native";
import { LoginScreenNavigationProp } from "../types";

const MainScreen = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const todoTasks = todos.filter((item: Todo) => item.state === "todo");
  const completedTasks = todos.filter((item: Todo) => item.state === "done");
  const auth = getAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
      console.log("로그아웃 되었습니다!");
    } catch (error) {
      if (error instanceof FirebaseError) console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>ToDo App</Text>
        <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
          <Text style={styles.logOutText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listView}>
        <Text style={styles.listTitle}>할일</Text>
        {todoTasks.length !== 0 ? (
          <FlatList
            data={todoTasks}
            renderItem={({ item }) => <TodoItem {...item} />}
            keyExtractor={(item: Todo) => item.id.toString()}
          />
        ) : (
          <Text style={styles.emptyListText}>할 일이 없습니다.</Text>
        )}
      </View>
      <View style={styles.separator} />
      <View style={styles.listView}>
        <Text style={styles.listTitle}>완료된 일</Text>
        {completedTasks.length !== 0 ? (
          <FlatList
            data={completedTasks}
            renderItem={({ item }) => <TodoItem {...item} />}
            keyExtractor={(item: Todo) => item.id.toString()}
          />
        ) : (
          <Text style={styles.emptyListText}>완료된 일이 없습니다.</Text>
        )}
      </View>
      <InputForm />
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 20 : 0,
    backgroundColor: "#f7f8fa",
  },
  pageTitle: {
    marginBottom: 35,
    paddingHorizontal: 15,
    fontSize: 54,
    fontWeight: "600",
  },
  separator: {
    marginHorizontal: 10,
    marginTop: 25,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: " rgba(0, 0, 0, 0.2)",
  },
  listView: {
    flex: 1,
  },
  listTitle: {
    marginBottom: 25,
    paddingHorizontal: 15,
    fontSize: 41,
    fontWeight: "500",
  },
  emptyListText: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    fontSize: 15,
    lineHeight: 20,
    color: "#737373",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logOutText: {
    color: "white",
    fontSize: 25,
  },
  logOutButton: {
    marginBottom: 25,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 4,
  },
});
