import React, { useEffect, useState } from 'react';
import PeriodicFrequencySelect from './PeriodicFrequencySelect';
import MonthlySelect from './MonthlySelect';
import EndBeginTimeInputs from './EndBeginTimeInputs';
import SelectMonthDay from './SelectMonthDay';
import Modal from '../modal/Modal';
import SelectWeekDay from './SelectWeekDay';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addEvent } from '@/redux/features/calendar-slice';
import { addEventToDate } from '@/redux/features/displayDay-slice';
import { useAppSelector } from '@/redux/store';

interface EventData {
    title: string;
    frequency: string;
    frequency_extension: string;
    begin_time: string;
    end_time: string;
    user_id: number;
}

const CreateEventModal = ({ showModal, setShowModal }: { showModal: boolean, setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [title, setTitle] = useState<string>('');
    const [isPeriodic, setIsPeriodic] = useState<boolean>(false);
    const [frequency, setFrequency] = useState<string>('');
    const [frequencyExtension, setFrequencyExtension] = useState<string>('');
    const [beginTime, setBeginTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [isBtnDisable, setIsBtnDisable] = useState<boolean>(true);
    const userID = useAppSelector((state)=> state.userReducer.value.id)
    const displayDay = useAppSelector((state)=> state.displayDayReducer.value)
    const dispatch = useDispatch();

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data: EventData = {
            title,
            frequency: frequency === '' ? 'Single' : frequency,
            frequency_extension: frequencyExtension,
            begin_time: beginTime,
            end_time: endTime,
            user_id: userID,
        };
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };

        try {
            const res = await axios.post("http://localhost:8080/event", data, { headers });
            dispatch(addEvent(res.data.event));
            dispatch(addEventToDate(res.data.event));
            setTitle('');
            setBeginTime('');
            setEndTime('');
            setIsPeriodic(false);
            setFrequency('');
            setFrequencyExtension('')
        } catch (error) {
            console.log(error);
        }
    };



    const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFrequency(e.target.value);
    };

    const handleFrequencyExtensionChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFrequencyExtension(e.target.value);
    };

    useEffect(() => {
        setIsBtnDisable(title.length < 3 || frequencyExtension === "" || beginTime === "" || endTime === "");
    }, [title, isPeriodic, frequency, frequencyExtension, endTime, beginTime,])


    useEffect(() => {
        setFrequency('');
        setFrequencyExtension('');
    }, [isPeriodic])

    useEffect(() => {
        setFrequencyExtension('');
    }, [frequency])


    return (
        <Modal showModal={showModal} handleClose={handleClose}>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="w-[85%]  h-full flex flex-col justify-evenly py-5"
            >
                <h2 className="text-2xl font-bold">Create Event</h2>
                <PeriodicFrequencySelect
                    setTitle={setTitle}
                    setIsPeriodic={setIsPeriodic}
                />

                <div className="w-full h-1/2 flex flex-row justify-between">
                    <div className="w-1/2 h-full flex flex-col justify-evenly">
                        {isPeriodic ? (
                            <select
                                value={frequency}
                                onChange={handleFrequencyChange}
                                className="select select-primary w-full mb-1"
                            >
                                <option value="">What is the Frequency of you event?</option>
                                <option value="Annually">Annually</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Weekly">Weekly</option>
                            </select>
                        ) : (
                            <input
                                type="date"
                                value={frequencyExtension}
                                onChange={handleFrequencyExtensionChange}
                                className="input input-primary"
                            />
                        )}

                        {isPeriodic && frequency === 'Annually' && (
                            <SelectMonthDay
                                setFrequencyExtension={setFrequencyExtension}
                            />
                        )}
                        {isPeriodic && frequency === 'Monthly' && (
                            <MonthlySelect
                                setFrequencyExtension={setFrequencyExtension}
                            />
                        )}
                        {isPeriodic && frequency === 'Weekly' && (
                            <SelectWeekDay
                                setFrequencyExtension={setFrequencyExtension}
                            />
                        )}
                    </div>
                    <EndBeginTimeInputs
                        beginTime={beginTime}
                        endTime={endTime}
                        setBeginTime={setBeginTime}
                        setEndTime={setEndTime}
                    />
                </div>
                <div className='w-full flex justify-end'>
                    <button
                        type="submit"
                        className={`btn w-1/3 btn-primary ${isBtnDisable ? 'btn-disabled' : ''
                            }`}
                        disabled={isBtnDisable}
                    >
                        Create Event
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateEventModal;
