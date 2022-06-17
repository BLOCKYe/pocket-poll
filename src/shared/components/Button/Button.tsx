/*
 * Project: pocket-poll
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 17.06.2022
 * Time: 14:39
*/

import React from 'react';

interface IButtonProps {
    text: string
    icon?: React.ReactNode;
    onClick: () => void;
    disabled?: boolean
}

const Button: React.FC<IButtonProps> = (props) => {


    const buttonStyles = 'flex items-center bg-dark-black rounded-md text-center px-5 md:px-10 py-3 gap-5 text-lg ' +
        'transition-all hover:bg-dark-light disabled:opacity-10 disabled:hover:bg-dark-black'

    return (
        <button className={buttonStyles} onClick={() => props.onClick()} disabled={props.disabled}>
            {props.text} {props.icon}
        </button>
    );
};

export default Button;