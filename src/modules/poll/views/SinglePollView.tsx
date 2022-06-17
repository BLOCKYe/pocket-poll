/*
 * Project: pocket-poll
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 17.06.2022
 * Time: 15:01
*/

import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import Button from "../../../shared/components/Button/Button";
import AnswerItem from "../components/AnswerItem";
import {HiShare} from "react-icons/hi";

export const initialAnswersList: IAnswer[] = [{
    content: 'Example answer number 1',
    id: uuidv4()
}, {content: 'Example answer number 2', id: uuidv4()}]


export interface IAnswer {
    content: string,
    id: string
}

const SinglePollView: React.FC = () => {


    /* States */
    const [titleValue] = useState<string>('Example title value')
    const [descriptionValue] = useState<string>('Example description text hahah')
    const [answers] = useState<IAnswer[]>(initialAnswersList)
    const [isCopied, setIsCopied] = useState<boolean>(false)


    /**
     * This method is used to
     * share current poll
     */

    const sharePoll = () => {
        navigator.clipboard.writeText(window.location.href)
        setIsCopied(true)
    }

    return (
        <div className={'grid place-items-center w-full'}>
            <div className={'w-full max-w-4xl grid p-3 md:p-5 min-h-screen content-center'}>


                {/* <--- Header with title and description ---> */}
                <div className={'text-4xl md:text-5xl font-bold'}>
                    {titleValue}
                </div>

                <div className={'text-white-dark text-xl mt-3 w-full'}>
                    {descriptionValue}
                </div>


                {/* <--- Answers ---> */}
                <div>
                    <div className={'font-bold text-color-main text-xs mt-10'}>
                        ODPOWIEDZI
                    </div>


                    {/* <--- Dislay all answers ---> */}
                    <div className="grid gap-3 mt-5">
                        {[].slice.call(answers).map((answer: IAnswer, idx: number) =>
                            <AnswerItem data={answer} index={idx} key={answer.id} />
                        )}
                    </div>
                </div>


                <div className={'flex justify-end mt-5'}>
                    <Button text={isCopied ? 'Skopiowano link!' : 'Udostępnij'} onClick={() => sharePoll()} icon={<HiShare />} />
                </div>
            </div>
        </div>
    );
};

export default SinglePollView;
