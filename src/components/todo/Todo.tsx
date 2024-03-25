import { Todo } from "@/types/models";
import { MouseEvent } from 'react';

interface contextMenu {
    show: boolean
    x: number
    y: number
}

interface props {
    todo: Todo,
    index: number,
    handleCheck: (index: number) => void
    setContextMenu: React.Dispatch<React.SetStateAction<contextMenu>>
}


export default function TodoComponent({ todo, index, handleCheck, setContextMenu }: props) {


    function handleContexMenu(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
        e.preventDefault();
        const { pageX, pageY } = e
        setContextMenu({
            show: true,
            x: pageX,
            y: pageY
        })
    }

    return (
        <div className="w-full p-1 rounded-lg flex flex-row items-center justify-start
                hover:bg-[rgba(255,255,255,0.5)] transition-all duration-200 ease-out
                overflow-hidden whitespace-nowrap overflow-ellipsis"
            key={index} onContextMenu={(e) => handleContexMenu(e)}>
            <input onChange={() => handleCheck(index)}
                type="checkbox" checked={todo.completed} className="checkbox mr-4 " />
            <p className="w-[35%] flex justify-start mr-5">
                {todo.title.length > 10 ? `${todo.title.slice(0, 10)}...` : todo.title}</p>
            {todo.term ?
                <div>
                    <p className="w-[40%]">{todo.term.split("-")[2] + "/" + todo.term.split("-")[1] + "/" + todo.term.split("-")[0]}</p>
                    <p>{todo.term.split('-')[3]}</p>
                </div>
                :
                <p className="w-[40%] text-center">--------</p>
            }
        </div>
    )
}