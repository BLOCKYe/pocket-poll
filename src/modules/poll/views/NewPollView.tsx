/*
 * Project: pocket-poll
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 17.06.2022
 * Time: 15:01
*/

import React, {useEffect, useState} from 'react';
import Input from "../../../shared/components/Input/Input";
import {v4 as uuidv4} from 'uuid';
import {useNavigate} from "react-router-dom";
import Button from "../../../shared/components/Button/Button";
import {MdSave} from "react-icons/md";
import EditableAnswerItem from "../components/EditableAnswerItem";

export const initialAnswersList: IAnswer[] = [{content: '', id: uuidv4()}, {content: '', id: uuidv4()}]

export interface IAnswer {
    content: string,
    id: string
}


const NewPollView: React.FC = () => {
    const navigate = useNavigate();


    /* States */
    const [titleValue, setTitleValue] = useState<string>('')
    const [descriptionValue, setDescriptionValue] = useState<string>('')
    const [answers, setAnswers] = useState<IAnswer[]>(initialAnswersList)


    /**
     * This method is used to
     * change title value and
     * save it to state
     * @param e
     */

    const handleTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 50) return

        setTitleValue(e.target.value)
    }


    /**
     * This method is used to
     * change description value and
     * save it to state
     * @param e
     */

    const handleDescriptionValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 200) return

        setDescriptionValue(e.target.value)
    }


    /**
     * This method is used to
     * change answer value and
     * save it to state
     * @param e
     */

    const handleAnswerValue = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        if (e.target.value.length > 50) return

        const newState = answers.map((answer: IAnswer) => {
            if (answer.id === id) {
                return {...answer, content: e.target.value}
            }

            return answer
        })

        setAnswers(newState)
    }


    /**
     * This method is used to
     * add new answer when
     * last is not empty
     */

    const fullAnswersObserver = () => {
        if (answers[answers.length - 1].content !== '') {
            const newAnswersState = answers;

            const newItem: IAnswer = {
                content: '',
                id: uuidv4()
            }

            setAnswers([...newAnswersState, newItem])
        }
    }

    useEffect(() => {
        fullAnswersObserver()
    }, [answers])


    /**
     * This function is used to
     * create poll to it
     */

    const createPoll = () => {
        navigate('/' + uuidv4(), {replace: true})
    }


    return (
        <div className={'grid place-items-center w-full'}>
            <div className={'w-full max-w-4xl grid p-3 md:p-5 min-h-screen content-center'}>


                {/* <--- Header with title and description ---> */}
                <div className={'text-4xl md:text-5xl font-bold'}>
                    <Input value={titleValue} onChange={handleTitleValue} placeholder={'Wprowadź pytanie...'} />
                </div>

                <div className={'text-white-dark text-xl mt-3 w-full'}>
                    <Input value={descriptionValue} onChange={handleDescriptionValue}
                        placeholder={'Krótki opis ankiety..'} />
                </div>

                {/* <--- Answers ---> */}
                <div className={'px-2 md:px-5'}>
                    <div className={'font-bold text-color-main text-xs mt-10'}>
                        ODPOWIEDZI
                    </div>


                    {/* <--- Dislay all answers ---> */}
                    <div className="grid gap-3 mt-5">
                        {[].slice.call(answers).map((answer: IAnswer, idx: number) =>
                            <EditableAnswerItem data={answer} index={idx} key={answer.id}
                                handleAnswerValue={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswerValue(e, answer.id)} />
                        )}
                    </div>

                    <div className={'flex justify-end mt-5'}>
                        <Button text={'Stwórz'} onClick={() => createPoll()} icon={<MdSave />} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPollView;
