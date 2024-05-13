import React, { useState, useEffect } from 'react';

const SelectWeekDay = ({ setFrequencyExtension }: { setFrequencyExtension: React.Dispatch<React.SetStateAction<string>> }) => {
    const [weekDays, setWeekDays] = useState<boolean[]>([false, false, false, false, false, false, false]);
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


    useEffect(() => {
        const dispatchEvent = () => {
            const selectedDays = weekDays.map((day, index) => {
                return day ? days[index] + "-" : "";
            }).join("").slice(0, -1);
            setFrequencyExtension(selectedDays);
        };
        dispatchEvent();
    }, [weekDays, days, setFrequencyExtension]);


    const handleCheckboxChange = (index: number) => {
        const updatedWeekDays = [...weekDays];
        updatedWeekDays[index] = !updatedWeekDays[index];
        setWeekDays(updatedWeekDays);
    };

    return (
        <div className="grid grid-flow-row grid-cols-3 gap-y-3 gap-x-3 z-20">
            {days.map((day, index) => (
                <div  className="flex flex-row items-center justify-around" key={index}>
                    <label htmlFor={day.toLowerCase()}>{day}.</label>
                    <input
                        type="checkbox"
                        id={day.toLowerCase()}
                        value={day.toLowerCase()}
                        className="checkbox"
                        checked={weekDays[index]}
                        onChange={() => handleCheckboxChange(index)}
                    />
                </div>
            ))}
        </div >
    );
};

export default SelectWeekDay;
