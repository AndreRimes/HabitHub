import React, { useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispathc } from '@/redux/store';
import { addTodo } from '@/redux/features/todo-slice';
import { useAppSelector } from '@/redux/store';
import { getHeader } from '@/util/util';

interface TodoReq {
    title: string;
    term: string;
    user_id: number;
}

interface prop {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateTodoModal = ({ showModal, setShowModal }: prop) => {
    const [title, setTitle] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('Deadline');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [isBtnDisable, setIsBtnDisable] = useState<boolean>(true);
    const dispatch = useDispatch<AppDispathc>()
    const user = useAppSelector((state)=> state.userReducer.value)

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data: TodoReq = {
            title,
            term: deadline === 'Deadline' ? `${date}-${time}` : '',
            user_id: user.id,
        };

        const headers = getHeader();
        try {
            const todo = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/todo', data, { headers });
            dispatch(addTodo(todo.data.todo))
            setTitle('');
            setDate('');
            setTime('');
            setDeadline('');
        } catch (error) {
            console.log(error);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
    };

    const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeadline(e.target.value);
    };


    useEffect(() => {
        setIsBtnDisable(title.length < 3
            || (deadline === "Deadline" && (date === "" || time === "")))
    }, [title, date, time, deadline])


    return (
        <Modal showModal={showModal} handleClose={handleClose}>
            <form
                className="w-[85%] h-full flex flex-col justify-evenly py-5"
                onSubmit={(e) => handleSubmit(e)}
            >
                <h2 className="text-2xl font-bold">Create Todo</h2>

                <div className="w-full h-[40%] flex flex-row justify-between items-center">
                    <input
                        className="input input-secondary w-1/2 h-[40%]"
                        placeholder="Title: "
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                    />

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text mr-3">DeadLine:</span>
                            <input
                                type="radio"
                                value="Deadline"
                                className="radio radio-secondary"
                                checked={deadline === 'Deadline'}
                                onChange={handleDeadlineChange}
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text mr-3">No Deadline: </span>
                            <input
                                type="radio"
                                value="No Deadline"
                                id="NoDeadline"
                                name="NoDeadline"
                                className="radio radio-secondary"
                                checked={deadline === 'No Deadline'}
                                onChange={handleDeadlineChange}
                            />
                        </label>
                    </div>
                </div>

                <div className="w-full h-1/4 flex flex-row justify-between ">
                    {deadline === 'Deadline' && (
                        <div>
                            <h2 className="text-xl font-semibold">DeadLine:</h2>
                            <h3 className="text-lg">Day: {date.split('-').reverse().join('/')}</h3>
                            <h3 className="text-lg">Time: {time}</h3>
                        </div>
                    )}
                    {deadline === 'Deadline' && (
                        <div className="flex flex-col">
                            <input
                                type="date"
                                value={date}
                                onChange={handleDateChange}
                                className="input input-secondary mb-2"
                            />
                            <input
                                type="time"
                                value={time}
                                onChange={handleTimeChange}
                                className="input input-secondary"
                            />
                        </div>
                    )}
                </div>

                <div className="w-full flex justify-end items-end mt-4 ">
                    <button
                        type="submit"
                        className={`btn btn-secondary h-1/2 w-1/3 ${isBtnDisable ? 'btn-disabled' : ''}`}
                        disabled={isBtnDisable}
                    >
                        Create Todo
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateTodoModal;
