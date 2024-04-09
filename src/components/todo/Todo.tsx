import { Todo } from "@/types/models";
import { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd'


interface contextMenu {
    show: boolean
    x: number
    y: number
}

interface props {
    todo: Todo,
    index: number,
    handleCheck: (index: number, todo: Todo) => void
    moveTodo: (dragIndex: number, hoverIndex: number) => void
}

export default function TodoComponent({ todo, index, handleCheck, moveTodo}: props) {
  const ref = useRef<HTMLDivElement>(null)

  const [{handlerId},drop] = useDrop({
    accept:'todo',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item:any, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset:any = monitor.getClientOffset()

      const hoverClientY = (clientOffset).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveTodo(dragIndex, hoverIndex)

      item.index = hoverIndex 
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'todo',
    item: () => {
      return { index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })


  drag(drop(ref)) 
  return (
    <div
      className="w-full p-1 rounded-lg flex flex-row items-center justify-start
                hover:bg-[rgba(255,255,255,0.5)] transition-all duration-200 ease-out
                overflow-hidden whitespace-nowrap overflow-ellipsis"
      key={index}
      ref={ref}
      data-handler-id={handlerId}
    >
      <input
        onChange={() => handleCheck(index, todo)}
        type="checkbox"
        checked={todo?.completed}
        className="checkbox mr-4 "
      />
      <p className="w-[35%] flex justify-start mr-5">
        {todo?.title?.length > 10 ? `${todo?.title?.slice(0, 10)}...` : todo?.title}
      </p>
      {todo?.term ? (
        <div>
          <p className="w-[40%]">
            {todo?.term.split("-")[2] +
              "/" +
              todo?.term.split("-")[1] +
              "/" +
              todo?.term.split("-")[0]}
          </p>
          <p>{todo?.term.split("-")[3]}</p>
        </div>
      ) : (
        <p className="w-[40%] text-center">--------</p>
      )}
    </div>
  );
}