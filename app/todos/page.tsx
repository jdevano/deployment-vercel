"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
};

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  // Fetch todos
  const loadTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  // Create todo
  const createTodo = async () => {
    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    setTitle("");
    loadTodos();
  };

  // Toggle done
  const toggleTodo = async (id: number, done: boolean) => {
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ done }),
    });
    loadTodos();
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    loadTodos();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>

      <input
        value={title}
        placeholder="Tambah todo..."
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createTodo}>Tambah</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.done}
              onChange={(e) => toggleTodo(t.id, e.target.checked)}
            />
            {t.title}
            <button onClick={() => deleteTodo(t.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
