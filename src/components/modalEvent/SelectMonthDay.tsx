import React, { useState } from 'react';

const SelectMonthDay = ({ setFrequencyExtension }: { setFrequencyExtension: React.Dispatch<React.SetStateAction<string>> }) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    const [day, setDay] = useState<string>("");
    const [month, setMonth] = useState<string>("");

    const dispatchEvent = (selectedDay: string) => {
        setFrequencyExtension(month + "-" + selectedDay);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMonth = e.target.value;
        setMonth(selectedMonth);
        dispatchEvent(day);
    };

    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDay = e.target.value;
        setDay(selectedDay);
        dispatchEvent(selectedDay);
    };

    return (
        <div className="date-input">
            <select
                id="month"
                className="select input-primary mr-1"
                value={month}
                onChange={handleMonthChange}
            >
                <option value="">Month</option>
                {months.map((month, index) => (
                    <option key={index} value={index+1}>{month}</option>
                ))}
            </select>
            <select
                id="day"
                className="select input-primary"
                value={day}
                onChange={handleDayChange}
            >
                <option value="">Day</option>
                {days.map((day, index) => (
                    <option key={index} value={day}>{day}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectMonthDay;
