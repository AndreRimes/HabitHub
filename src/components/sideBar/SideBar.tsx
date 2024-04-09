import { useState } from "react";
import Link from "next/link";

export default function SideBar() {
  const [isShow, setIsShow] = useState(false);

  return (
    <div
      className={`absolute ${
        isShow ? "w-[15.2vw]" : "w-[2.2vw]"
      } top-[10vh] left-0 flex flex-row items-center justify-around transition-width duration-500`}
    >
      {isShow && (
        <>
          <Link onClick={()=> setIsShow(false)} className="link" href={"/dashboard"}>
            <span>Home</span>
          </Link>
          <Link onClick={()=> setIsShow(false)} className="link text-nowrap" href={"/dashboard/habit-tracker"}>Habit Tracker</Link>
        </>
      )}
      <h1
        onClick={() => setIsShow(!isShow)}
        className="text-2xl font-extrabold hover:text-primary cursor-pointer transition-all"
      >
        {isShow ? "<<" : ">>"}
      </h1>
    </div>
  );
}

