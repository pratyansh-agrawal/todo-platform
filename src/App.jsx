import "./App.css";
import { useState, useEffect } from "react";

import { Typography } from "@material-ui/core";

import Form from "./components/Form";
import Container from "./components/Container";

function App() {

  //States for maintaing the lists
  const [todos, setTodos] = useState([]);
  const [progTodos, setProgTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);

  //Fetching local storage to retrieve saved todos from previous session
  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todoList")) ?? []);
    setProgTodos(JSON.parse(localStorage.getItem("progList")) ?? []);
    setDoneTodos(JSON.parse(localStorage.getItem("doneList")) ?? []);
  }, []);

  //Storing in local storage to persist state
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
    localStorage.setItem("progList", JSON.stringify(progTodos));
    localStorage.setItem("doneList", JSON.stringify(doneTodos));
  }, [todos, progTodos, doneTodos]);

  //Core actions - save and delete
  const saveTodo = (storageArr, value) => {
    const sanitizedInput = value.trim();
    if (sanitizedInput.length > 0) {
      return [...storageArr, { text: sanitizedInput }];
    }
    return storageArr;
  }

  const deleteTodo = (storageArr, todoIndex) => {
    return storageArr.filter((_, index) => index !== todoIndex);
  }

  //Secondary functions for todo state changes
  const moveToInProgress = (todoIndex) => {
    setProgTodos(saveTodo(progTodos, todos[todoIndex].text));
    const newTodos = todos.filter((_, index) => index !== todoIndex);
    setTodos(newTodos);
  };

  const moveToDone = (todoIndex) => {
    setDoneTodos(saveTodo(doneTodos, progTodos[todoIndex].text));
    const newProgTodos = progTodos.filter((_, index) => index !== todoIndex);
    setProgTodos(newProgTodos);
  };

  //Main Page component
  return (
    <div className="App bg-black flex flex-col h-screen w-screen bg-opacity-80 overflow-auto">

      <div className="text-white opacity-80 my-4">
        <Typography component="h1" variant="h2">
          T O D O S
        </Typography>
      </div>

      <div className={"bg-black bg-opacity-40 py-8 rounded-sm"}>
        <Form
          saveTodo={(value) => {
            setTodos(saveTodo(todos, value));
          }}
        />

        <div className="flex flex-row justify-evenly w-full h-full">
          
          <div className="px-4 w-1/3">
              <Container
                todos={todos}
                deleteTodo={(todoIndex) => {
                  setTodos(deleteTodo(todos, todoIndex));
                }}
                toggleTodoTask={moveToInProgress}
                titleName={"Todo"}
              />
          </div>
          <div className="pr-4 w-1/3">
              <Container
                todos={progTodos}
                deleteTodo={(todoIndex) => {
                  setProgTodos(deleteTodo(progTodos, todoIndex));
                }}
                toggleTodoTask={moveToDone}
                titleName={"In Progress"}
              />
          </div>
          <div className="pr-4 w-1/3">
              <Container
                todos={doneTodos}
                deleteTodo={(todoIndex) => {
                  setDoneTodos(deleteTodo(doneTodos, todoIndex));
                }}
                toggleTodoTask={(todoIndex) => { }}
                titleName={"Done"}
              />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
