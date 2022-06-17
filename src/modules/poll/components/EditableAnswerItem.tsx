/*
 * Project: pocket-poll
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 17.06.2022
 * Time: 16:26
*/

import React from 'react';
import {IAnswer} from "../views/NewPollView";
import Input from "../../../shared/components/Input/Input";

interface IEditableAnswerItemProps {
    data: IAnswer;
    index: number
    handleAnswerValue: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

const EditableAnswerItem: React.FC<IEditableAnswerItemProps> = (props) => {
    return (
        <div className={'text-white-dark text-md rounded bg-dark-light w-full ' +
            'flex gap-1 items-center px-3 border-[1px] border-dark-shadow transition-all ' +
            'hover:border-color-main'}>

            <div className={'font-bold text-color-main text-xl pl-2'}>
                {props.index + 1}.
            </div>

            <Input value={props.data.content} placeholder={'Wprowadź treść...'} className={''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handleAnswerValue(e, props.data.id)}
            />
        </div>
    );
};

export default EditableAnswerItem;
