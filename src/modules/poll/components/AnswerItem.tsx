/*
 * Project: pocket-poll
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 17.06.2022
 * Time: 16:26
*/

import React from 'react';
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
        ` border-[1px] border-dark-shadow transition-all ${props.voted ? 'cursor-default' : 'cursor-pointer hover:border-color-main'}`

        else return 'text-dark-main text-md rounded bg-color-main w-full flex gap-1 items-center px-3' +
            ` border-[1px] border-color-light transition-all ${props.voted ? 'cursor-default' : 'cursor-pointer hover:border-color-main'}`
    }


    /**
     * This method is used to
     * compute percentage of
     * current answer
     */

    const computePercentage = () => {
        if (!props.data?.counter) return 0;
        if (!props?.totalVotes) return 0;

        if (props?.totalVotes === 0) return 0
        if (props.data?.counter === 0) return 0

        const result = props.data?.counter / props.totalVotes * 100

        return result.toFixed(0)

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

            <div className={'whitespace-nowrap font-bold'}>
                {computePercentage()}% ({props.data?.counter})
            </div>
        </div>
    );
};

export default EditableAnswerItem;
