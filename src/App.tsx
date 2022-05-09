import React from "react";
import "./App.css";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface TodoModel {
  text: string;
  isDone: boolean;
}

interface TodoProps {
  todo: TodoModel;
  index: number;
  markTodo: Function;
  removeTodo: Function;
}

interface TodoFormProps{
  addTodo:Function;
}

function Todo({ todo, index, markTodo, removeTodo }: TodoProps) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        {todo.text}
      </span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>
          ✓
        </Button>{" "}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>
          ✕
        </Button>
      </div>
    </div>
  );
}

function FormTodo({addTodo}:TodoFormProps) {
  const [value, setValue] = React.useState("");

  const handleSubmit: any = (e: Event) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b>Add Todo</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new todo"
        />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState<TodoModel[]>([
    {
      text: "This is a sampe todo",
      isDone: false,
    },
  ]);

  const addTodo: Function = (text: string) => {
    const newTodos: TodoModel[] = [...todos, { text: text, isDone: false }];
    setTodos(newTodos);
  };

  const markTodo: Function = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo: Function = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
