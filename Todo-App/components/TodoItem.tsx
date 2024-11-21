import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import CheckboxUnchecked from "../assets/checkbox-unchecked.svg";
import Checkboxchecked from "../assets/checkbox-checked.svg";
import DeleteIcon from "../assets/delete.svg";
import { deleteTodo, Todo, updateTodo } from "../redux/slices/todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = (item: Todo) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.itemContainer}>
      <Pressable
        style={styles.itemCheckbox}
        hitSlop={10}
        onPress={() => dispatch(updateTodo(item.id))}
      >
        {item.state === "todo" ? (
          <CheckboxUnchecked />
        ) : (
          <Checkboxchecked style={styles.itemCheckboxCheckedIcon} />
        )}
      </Pressable>
      <Text
        style={[
          styles.itemText,
          item.state === "done" && styles.itemTextChecked,
        ]}
      >
        {item.text}
      </Text>
      <Pressable
        style={[
          styles.deleteButton,
          item.state === "done" && styles.deleteButtonDone,
        ]}
        hitSlop={10}
        onPress={() => dispatch(deleteTodo(item.id))}
      >
        <DeleteIcon />
      </Pressable>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#f7f88fa",
  },
  itemCheckbox: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
  },
  itemCheckboxCheckedIcon: {
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  itemText: {
    marginRight: "auto",
    paddingRight: 25,
    fontSize: 15,
    lineHeight: 20,
    color: "#737373",
  },
  itemTextChecked: {
    opacity: 0.3,
    textDecorationLine: "line-through",
  },
  deleteButton: {
    opacity: 0.8,
  },
  deleteButtonDone: {
    opacity: 0.3,
  },
});
