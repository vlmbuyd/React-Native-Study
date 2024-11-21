import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./reducers";
import axios from "axios";
import { Post } from "./reducers/posts";
import { fetchPosts } from "./actions/posts";

type Props = {
  value: any;
  onIncrement: () => void;
  onDecrement: () => void;
};

function App({ value, onIncrement, onDecrement }: Props) {
  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter);
  const todos: string[] = useSelector((state: RootState) => state.todos);
  const posts: Post[] = useSelector((state: RootState) => state.posts);

  const [todoValue, setTodoValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", text: todoValue });
    setTodoValue("");
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="App">
      Clicked: {counter}times
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <form onSubmit={addTodo}>
        <input type="text" value={todoValue} onChange={handleChange} />
        <input type="submit" />
      </form>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
