import React, { useState } from 'react';

interface props {
    setBeginTime: React.Dispatch<React.SetStateAction<string>>
    setEndTime : React.Dispatch<React.SetStateAction<string>>
    beginTime: string
    endTime: string
}

const EndBeginTimeInputs = ({beginTime,setBeginTime, setEndTime, endTime}: props) => {

    const handleBeginTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value;
        setBeginTime(time);
    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = e.target.value;
        setEndTime(time);
    };

    return (
        <div className="flex flex-col h-full justify-evenly">
            <div className="w-full flex flex-row mr-2 items-center justify-between h-1/2">
                <label htmlFor="beginTime">Begin Time:</label>
                <input
                    type="time"
                    id="beginTime"
                    className="input input-primary h-1/2"
                    value={beginTime}
                    onChange={handleBeginTimeChange}
                />
            </div>

            <div className="w-full flex flex-row items-center justify-between h-1/2">
                <label htmlFor="endTime">End Time:</label>
                <input
                    type="time"
                    id="endTime"
                    className="input input-primary h-1/2"
                    value={endTime}
                    onChange={handleEndTimeChange}
                />
            </div>
        </div>
    );
};

export default EndBeginTimeInputs;
