import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todoSlice";

const InputForm = () => {
  const dispatch = useDispatch();
  const [currentValue, setCurrentValue] = useState("");

  const handleSubmit = () => {
    if (currentValue !== "") {
      dispatch(addTodo(currentValue));
      setCurrentValue("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.addFormcontainer}
    >
      <TextInput
        style={styles.inputField}
        placeholder="할 일을 작성해주세요"
        value={currentValue}
        onChangeText={setCurrentValue}
        onSubmitEditing={handleSubmit}
      />
      <Pressable style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addButtonText}>+</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  addFormcontainer: {
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: "#f7f8fa",
  },
  inputField: {
    flex: 1,
    height: 42,
    padding: 5,
    marginRight: 25,
    borderRadius: 4,
    borderBlockColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    color: "#000000",
    fontSize: 15,
    textAlignVertical: "center",
  },
  addButton: {
    // flexDirection이 명시되지 않음 -> 기본값 "column"이
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.7)",
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  addButtonText: {
    color: "white",
    fontSize: 25,
  },
});
