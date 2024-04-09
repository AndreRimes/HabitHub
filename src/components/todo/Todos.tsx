import { useAppSelector } from "@/redux/store";
import { Todo } from "@/types/models";
import axios from "axios";
import { AppDispathc } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toggleTodo,moveTodo } from "@/redux/features/todo-slice";
import TodoComponent from "./Todo";
import { useCallback, useState } from "react";

export default function Todos({
  setShowModalTodo,
}: {
  setShowModalTodo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const todos = useAppSelector((state) => state.todosReducer.value);
  const dispatch = useDispatch<AppDispathc>();

  async function handleCheck(index: number, todo:Todo) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.patch(
        "http://localhost:8080/todo/" + todo.id,
        {},
        { headers }
      );
      dispatch(toggleTodo(index));
    } catch (e) {
      console.error(e);
    }
  }

  const handleMoveTodo = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveTodo({ dragIndex, hoverIndex }));
  }; 

  const renderTodo = useCallback((todo: Todo, index: number) => {
    return (
      <TodoComponent
        todo={todo}
        index={index}
        handleCheck={handleCheck}
        moveTodo={handleMoveTodo}
      />
    );
  }, []);

  return (
    <>
      <div className="min-h-[45%] max-h-[80%]  w-full flex flex-col items-center cursor-move">
        <h3 className="text-lg font-semibold">Todos</h3>
        <div className="w-full min-w-full h-full overflow-y-auto overflow-x-clip text-sm">
          {todos && todos.map((todo: Todo, index) => renderTodo(todo, index))}
        </div>
        <button
          className="btn btn-sm btn-secondary mt-2"
          onClick={() => setShowModalTodo(true)}
        >
          Add Todo
        </button>
      </div>
    </>
  );
}
