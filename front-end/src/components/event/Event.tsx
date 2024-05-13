import React from "react";
import { useAppSelector } from "@/redux/store";
import { EventType } from "@/types/models";

export default function Events({
  setShowModalEvent,
}: {
  setShowModalEvent: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const day = useAppSelector((state) => state.displayDayReducer.value);

  return (
    <div className="min-h-[40%] max-h-[40%] overflow-y-auto flex flex-col items-center mb-4">
      <h3 className="text-lg font-semibold">
        {day?.isToday
          ? "Today's"
          : day?.date?.split("-").reverse().slice(0, 2).join("/") + "'s"}{" "}
        Event:
      </h3>

      <div className="w-full min-w-full h-full overflow-y-auto overflow-x-clip text-sm">
        {day?.events && day.events.map((event: EventType, index) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-row items-center justify-between p-1 overflow-hidden whitespace-nowrap overflow-ellipsis"
                >
                  <p className="mr-4 font-semibold">{event.title}</p>
                  <p>
                    {event.begin_time}-{event.end_time}
                  </p>
                </div>
              );
            })}
      </div>
      <button
        className="btn btn-sm btn-primary mt-2"
        onClick={() => setShowModalEvent(true)}
      >
        Add Event
      </button>
    </div>
  );
}
