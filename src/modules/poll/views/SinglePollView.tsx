/*
 * Project: pocket-poll
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 17.06.2022
 * Time: 15:01
*/

import React, {useEffect, useState} from 'react';
import Button from "../../../shared/components/Button/Button";
import AnswerItem from "../components/AnswerItem";
import {HiShare} from "react-icons/hi";
import "firebase/compat/firestore";
import {getFirestore, doc, updateDoc, increment} from 'firebase/firestore';
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
    const [voted, setVoted] = useState<IAnswer>()


    /**
     * This method is used to
     * share current poll
     */

    const sharePoll = () => {
        navigator.clipboard.writeText(window.location.href)
        setIsCopied(true)
    }


    /**
     * This method is used to
     * vote for an answer
     * @param answer
     */

    const vote = async (answer: IAnswer) => {
        if (!value) return
        if (!value.data()) return;

        // get user votes history
        let historyCopy = JSON.parse(localStorage.getItem("history")!) || []

        // block multi vote if user already voted
        if (historyCopy.find((item: any) => item.id === value.data()?.id)) return;

        const historyItem = {
            id: value?.data()?.id,
            answer: answer
        }

        historyCopy = [...historyCopy, historyItem]
        localStorage.setItem("history", JSON.stringify(historyCopy))
        setVoted(answer)

        const pollRef = doc(getFirestore(app), 'polls', id!)
        await updateDoc(pollRef, {
            totalVotes: increment(1)
        })
    }


    /**
     * This method is used to
     * set last answer for this poll
     */

    const findHistoryVote = () => {
        if (!value) return
        if (!value.data()) return;

        // get user votes history
        let historyCopy = JSON.parse(localStorage.getItem("history")!) || []

        // find answer for this poll
        const lastVote = historyCopy.find((item: any) => item.id === value.data()?.id)

        if (!lastVote) return;
        setVoted(lastVote.answer)
    }

    /* <--- Firebase ---> */
    const [value, loading] = useDocument(
        doc(getFirestore(app), 'polls', id!),
        {
            snapshotListenOptions: {includeMetadataChanges: true},
        }
    );


    useEffect(() => {
        findHistoryVote()
    }, [value])

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
                                    <AnswerItem data={answer} index={idx} key={answer.id} voted={voted} vote={vote}
                                        totalVotes={value && value.data()?.totalVotes} />
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
