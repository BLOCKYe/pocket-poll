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
}

const Button: React.FC<IButtonProps> = (props) => {


    const buttonStyles = 'flex items-center bg-dark-black rounded-md text-center px-10 py-3 gap-5 text-lg ' +
        'md:text-xl transition-all hover:bg-dark-light'

    return (
        <button className={buttonStyles} onClick={() => props.onClick()}>
            {props.text} {props.icon}
        </button>
    );
};

export default Button;