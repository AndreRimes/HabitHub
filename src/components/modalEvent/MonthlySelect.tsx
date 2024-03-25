import React from 'react';

const MonthlySelect = ({ setFrequencyExtension }: { setFrequencyExtension: React.Dispatch<React.SetStateAction<string>> }) => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setFrequencyExtension(selectedValue);
    };

    return (
        <select
            className="select select-primary select-md mt-2 w-full"
            onChange={handleChange}
        >
            <option disabled selected>Select Day: </option>
            {days.map((day) => (
                <option key={day} value={day.toString()}>{day}</option>
            ))}
        </select>
    );
};

export default MonthlySelect;
