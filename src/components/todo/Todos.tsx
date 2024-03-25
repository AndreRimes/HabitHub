import { useAppSelector } from "@/redux/store";
import { Todo } from "@/types/models";
import axios from "axios";
import { AppDispathc } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toggleTodo } from "@/redux/features/todo-slice";
import TodoComponent from "./Todo"
import { useState } from "react";
import ContextMenu from "../contextMenu/ContextMenu"




export default function Todos({ setShowModalTodo }: { setShowModalTodo: React.Dispatch<React.SetStateAction<boolean>> }) {
    const todos = useAppSelector((state) => state.todosReducer.value);
    const dispatch = useDispatch<AppDispathc>();
    const [contextMenu, setContextMenu] = useState({
        show: false,
        x: 0,
        y: 0,

    })

    async function handleCheck(index: number) {

        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`
            };
            await axios.patch("http://localhost:8080/todo/" + todos[index].id, {}, { headers })
            dispatch(toggleTodo(index))
        } catch (e) {
            console.error(e);
        }
    }

    function closeContexMenu() {
        setContextMenu({ x: 0, y: 0, show: false })
    }

    return (
        <>
            {contextMenu.show && < ContextMenu x={contextMenu.x} y={contextMenu.y} closeContextMenu={closeContexMenu} />}
            <div className="min-h-[45%] max-h-[80%]  w-full flex flex-col items-center">
                <h3 className="text-lg font-semibold">Todos</h3>
                <div className="w-full min-w-full h-full overflow-y-auto overflow-x-clip text-sm">
                    {todos && todos.map((todo: Todo, index) => {
                        return (
                            <TodoComponent key={index} setContextMenu={setContextMenu} todo={todo} index={index} handleCheck={handleCheck} />
                        )
                    })}
                </div>
                <button
                    className="btn btn-sm btn-secondary mt-2"
                    onClick={() => setShowModalTodo(true)}>Add Todo</button>
            </div>
        </>
    )
}