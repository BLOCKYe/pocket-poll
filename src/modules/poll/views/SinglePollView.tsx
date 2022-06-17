/*
 * Project: pocket-poll
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 17.06.2022
 * Time: 15:01
*/

import React, {useState} from 'react';
import Button from "../../../shared/components/Button/Button";
import AnswerItem from "../components/AnswerItem";
import {HiShare} from "react-icons/hi";
import "firebase/compat/firestore";
import {getFirestore, doc} from 'firebase/firestore';
import app from "../../../core/config/firebase";
import {useDocument} from "react-firebase-hooks/firestore";
import {useParams} from "react-router-dom";

export interface IAnswer {
    content: string,
    id: string
    counter: number
}

const SinglePollView: React.FC = () => {
    let {id} = useParams()

    /* States */
    const [isCopied, setIsCopied] = useState<boolean>(false)


    /**
     * This method is used to
     * share current poll
     */

    const sharePoll = () => {
        navigator.clipboard.writeText(window.location.href)
        setIsCopied(true)
    }


    /* <--- Firebase ---> */
    const [value, loading] = useDocument(
        doc(getFirestore(app), 'polls', id!),
        {
            snapshotListenOptions: {includeMetadataChanges: true},
        }
    );


    return (
        <div className={'grid place-items-center w-full'}>
            <div className={'w-full max-w-4xl grid p-3 md:p-5 min-h-screen content-center'}>

                {loading && (
                    <div>Ładowanie danych</div>
                )}


                {!loading && value && value.data() === undefined && (
                    <div className={'text-4xl md:text-5xl font-bold'}>
                        Ankieta nie istnieje
                    </div>
                )}


                {/* <--- Display after end of loading ---> */}
                {!loading && value && value.data() !== undefined && (
                    <>
                        {/* <--- Header with title and description ---> */}
                        <div className={'text-4xl md:text-5xl font-bold'}>
                            {value && value.data()?.title}
                        </div>

                        <div className={'text-white-dark text-xl mt-5 w-full'}>
                            {value && value.data()?.description}
                        </div>


                        {/* <--- Answers ---> */}
                        <div>
                            <div className={'font-bold text-color-main text-xs mt-10'}>
                                ODPOWIEDZI
                            </div>


                            {/* <--- Dislay all answers ---> */}
                            <div className="grid gap-3 mt-5">
                                {(value && value.data()!.answers).map((answer: IAnswer, idx: number) =>
                                    <AnswerItem data={answer} index={idx} key={answer.id} totalVotes={value && value.data()?.totalVotes}/>
                                )}
                            </div>
                        </div>


                        <div className={'flex justify-end mt-5'}>
                            <Button text={isCopied ? 'Skopiowano link!' : 'Udostępnij'} onClick={() => sharePoll()}
                                icon={<HiShare />} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SinglePollView;
