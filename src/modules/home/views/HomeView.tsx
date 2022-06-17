/*
 * Project: pocket-poll
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 17.06.2022
 * Time: 14:26
*/

import React from 'react';
import Button from "../../../shared/components/Button/Button";
import {BsArrowRight} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

const HomeView: React.FC = () => {
    const navigate = useNavigate();


    /**
     * This function is used to
     * change route
     * @param link
     */

    const navigateToRoute = (link: string) => {
        navigate(link, {replace: true})
    }

    return (
        <div className={'grid place-items-center w-full'}>
            <div className={'w-full max-w-4xl grid place-items-center p-3 md:p-5 min-h-screen content-center'}>

                {/* <--- Header ---> */}
                <div className={'text-4xl md:text-5xl font-bold scale-up-center-1'}>
                    Pocket Poll
                </div>

                <div className={'text-white-dark text-xl mt-5 text-center scale-up-center-2'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium cumque cupiditate delectus
                    doloribus dolorum <b className={'text-white-light'}>exercitationem</b> expedita facilis hic incidunt
                    ipsam maxime numquam placeat porro ratione reiciendis <b
                    className={'text-color-main'}>reprehenderit</b> repudiandae, sed sint! Integer malesuada non risus
                    vel imperdiet. Nullam nec enim ante. Nullam eleifend, augue ac cursus vestibulum, tortor eros
                    condimentum purus, vitae sollicitudin libero ipsum ut lacus. Fusce pulvinar lectus felis, vel
                    vulputate libero elementum et.
                </div>

                <div className={'mt-5 scale-up-center-3'}>
                    <Button text={'Stwórz ankietę!'} icon={<BsArrowRight />} onClick={() => navigateToRoute('/new')} />
                </div>

            </div>
        </div>
    );
};

export default HomeView;
