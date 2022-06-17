/*
 * Project: pocket-poll
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 17.06.2022
 * Time: 16:26
*/

import React, {useState} from 'react';
import {IAnswer} from "../views/SinglePollView";

interface IEditableAnswerItemProps {
    data: IAnswer;
    index: number
    totalVotes: number
    voted: IAnswer | undefined
    vote: (answer: IAnswer) => void;
}

const EditableAnswerItem: React.FC<IEditableAnswerItemProps> = (props) => {


    /**
     * This factory is used to
     * render type of item
     */

    const typeFactory = () => {
        if (props.voted?.id !== props.data.id) return 'text-white-dark text-md rounded bg-dark-light w-full flex gap-1 items-center px-3' +
            ' border-[1px] border-dark-shadow transition-all hover:border-color-main cursor-pointer'

        else return 'text-dark-main text-md rounded bg-color-main w-full flex gap-1 items-center px-3' +
            ' border-[1px] border-color-light transition-all hover:border-color-main cursor-pointer'
    }

    return (
        <div className={typeFactory()} onClick={() => props.vote(props.data)}>

            <div className={`font-bold ${props.voted?.id === props.data.id ? '' : 'text-color-main'} text-xl pl-2`}>
                {props.index + 1}.
            </div>

            <div
                className={'w-full py-2 px-2 md:px-5 ' +
                    'rounded-md'}>
                {props.data?.content}
            </div>

            <div className={'whitespace-nowrap'}>
                {props.data?.counter / props.totalVotes * 100}% ({props.data?.counter})
            </div>
        </div>
    );
};

export default EditableAnswerItem;
