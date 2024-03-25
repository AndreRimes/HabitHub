
export default function ContextMenu({ x, y, closeContextMenu }:
    { x: number, y: number, closeContextMenu: () => void }) {

    return (
        <div className="w-screen h-screen top-0 left-0 absolute z-10" onClick={closeContextMenu}>
            <div onClick={(e)=> e.stopPropagation()} style={{ top: `${x}px`, left: `${y}px` }} className="absolute z-20">
                CONTEXT MENU
            </div>
        </div>
    );
}
