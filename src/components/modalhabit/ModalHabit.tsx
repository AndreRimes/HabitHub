import { FormEvent, useEffect, useState } from "react";
import Modal from "../modal/Modal";
import SelectWeekDay from "../modalEvent/SelectWeekDay";
import axios from "axios";
import { getHeader } from "@/util/util";
import { useDispatch } from "react-redux";
import { addHabitToList } from "@/redux/features/habit-slice";

interface prop {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalHabit({ showModal, setShowModal }: prop) {
  const [weekDays, setWeekDays] = useState("");
  const [title, setTitle] = useState("");
  const [isBtnDisable, setIsBtnDisable] = useState<boolean>(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers = getHeader();
    const data = {
      title,
      week_days: weekDays,
    };

    try {
      const res = await axios.post("http://localhost:8080/habit", data, {
        headers,
      });
      dispatch(addHabitToList(res.data.habit));
      setTitle("");
      setWeekDays("");
      setShowModal(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setIsBtnDisable(!(title.length > 2 && weekDays !== ''))
  }, [weekDays, title]);

  return (
    <Modal showModal={showModal} handleClose={handleClose}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full h-full flex flex-col justify-evenly"
      >
        <h1 className="text-2xl font-bold">Create New Habit!</h1>
        <div className="flex flex-col justify-evenly h-2/3">
          <input
            id="title"
            className="input input-primary w-1/2 h-1/5 "
            placeholder="Title: "
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <SelectWeekDay setFrequencyExtension={setWeekDays} />
        </div>

        <div className="w-full flex justify-end items-end mt-4 ">
          <button type="submit" 
          disabled={isBtnDisable} 
          className={`btn btn-${isBtnDisable ? 'dialbled' : 'primary'} h-1/2 w-1/3`}>
            Create Habit
          </button>
        </div>
      </form>
    </Modal>
  );
}
