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
            <div className={'w-full max-w-4xl grid place-items-center p-3 pt-20 md:p-5 md:min-h-screen content-center'}>

                {/* <--- Header ---> */}
                <div className={'text-4xl md:text-5xl font-bold scale-up-center-1'}>
                    Pocket Poll
                </div>

                <div className={'text-white-dark text-xl mt-5 text-center scale-up-center-2'}>
                    Tworzenie <b className={'text-white-light'}>ankiet</b> nigdy nie było tak proste! <b className={'text-color-main'}>Pocket Poll</b> to ultra szybka aplikacja pozwalająca na sporządzanie w <b className={'text-white-light'}>pełni anonimowych</b> sondaży. Intuicyjny i prosty interfejs sprawia, że <b className={'text-white-light'}>każda osoba</b> już w kilka chwil może dzielić się wynikami swojej ankiety! Rezultaty aktualizowane są na <b className={'text-white-light'}>bieżąco</b>, dlatego prezentowane dane są zawsze aktualne.
                </div>

                <div className={'mt-5 scale-up-center-3'}>
                    <Button text={'Stwórz ankietę!'} icon={<BsArrowRight />} onClick={() => navigateToRoute('/new')} />
                </div>

            </div>
        </div>
    );
};

export default HomeView;
