import React from 'react';

interface props {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setIsPeriodic: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const PeriodicFrequencySelect = ({title, setTitle, setIsPeriodic }: props) => {
    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setTitle(title);
    };

    const handleChangePeriodic = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isPeriodic = e.target.id === "Periodic";
        setIsPeriodic(isPeriodic);
    };

    return (
        <div className="w-full h-[25%] flex flex-row justify-between items-center">
            <input
                className="input input-primary w-1/2 h-[55%] min-h-[41px]"
                placeholder="Title: "
                type="text"
                onChange={handleChangeTitle}
                value={title}
            />

            <p className="absolute opacity-65 translate-x-[19vw] -translate-y-[10vh]">
                *Periodic mode will make you event repeat <br /> from time to time.
            </p>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text mr-3">Periodic</span>
                    <input
                        type="radio"
                        value="Periodic"
                        id="Periodic"
                        className="radio radio-primary"
                        name='periodicType'
                        onChange={handleChangePeriodic}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text mr-3">No Periodic: </span>
                    <input
                        type="radio"
                        value="No Deadline"
                        id="NoDeadline"
                        name='periodicType'
                        className="radio radio-primary"
                        onChange={handleChangePeriodic}
                    />
                </label>
            </div>
        </div>
    );
};

export default PeriodicFrequencySelect;
