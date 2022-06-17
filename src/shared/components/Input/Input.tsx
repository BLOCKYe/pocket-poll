/*
 * Project: pocket-poll
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 17.06.2022
 * Time: 15:04
*/

import React from 'react';

interface IInputProps {
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string
}

const Input: React.FC<IInputProps> = (props) => {


    return (
        <input placeholder={props.placeholder} value={props.value} onChange={props.onChange}
            className={'unset-all w-full box-border transition-all hover:bg-dark-light focus:bg-dark-light py-2 px-2 md:px-5 rounded-md ' + props.className} />
    );
};

export default Input;
