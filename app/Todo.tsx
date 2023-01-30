"use client";

import {
  color,
  Flex,
  useColorMode,
  useColorModeValue,
  Button,
  Heading,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MoonIcon, SunIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
export default function TodoApp() {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.200", "gray.700");
  const deleteTodo = (e: any) => {
    const newTodo = todos.filter((tod) => {
      return !(tod.todo === e.todo);
    });
    setTodos(newTodo);
    console.log("new Todo", newTodo, "Old todo", todos);
  };

  const TodoAdd = () => {
    if (todo === "") {
      addTodos("");
    } else {
      const newTodo = { todo: todo, isDone: false };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      addTodos("");
    }
  };
  const [todos, setTodos] = useState([
    { todo: "Learn NextJS", isDone: false },
    { todo: "Cook Food", isDone: true },
    { todo: "Play Games", isDone: false },
    { todo: "Sleep", isDone: true },
    { todo: "Wake Up", isDone: false },
  ]);
  const [todo, addTodos] = useState("");
  const onClickHandler = (todoUpdate: any) => {
    let newTodo = todos.map((todo) => {
      if (todo.todo === todoUpdate.todo) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(newTodo);
    console.log(newTodo);
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Flex
          direction="column"
          background={formBackground}
          padding={12}
          rounded={5}
          alignItems="center"
        >
          <Heading padding={6}>Todo App</Heading>
          <Button
            shadow={"dark-lg"}
            onClick={toggleColorMode}
            style={{ width: "fit-content" }}
            marginBottom={4}
          >
            {" "}
            {formBackground == "gray.200" ? <SunIcon /> : <MoonIcon />}
          </Button>
          <Stack direction={"row"} mb={4}>
            <input
              style={{ textAlign: "center" }}
              type="text"
              value={todo}
              placeholder="Add Todos"
              onChange={(e) => {
                addTodos(e.target.value);
              }}
            />
            <Button
              onClick={TodoAdd}
              mb={2}
              padding={5}
              colorScheme="teal"
              leftIcon={<AddIcon />}
              variant="outline"
            >
              Add
            </Button>
          </Stack>

          <Stack spacing={5} direction="column">
            {todos.map((x) => {
              return (
                <>
                  <Stack direction="row">
                    <li>
                      <Checkbox
                        colorScheme={"green"}
                        defaultChecked={x.isDone}
                        onChange={() => onClickHandler(x)}
                        key={x.todo}
                      >
                        {x.todo}
                        <Button
                          size={"small"}
                          onClick={() => deleteTodo(x)}
                          marginLeft={3}
                        >
                          <DeleteIcon />
                        </Button>
                      </Checkbox>
                    </li>
                  </Stack>
                </>
              );
            })}
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
