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
import {doc, getFirestore, increment, updateDoc} from 'firebase/firestore';
import app from "../../../core/config/firebase";
import {useDocument} from "react-firebase-hooks/firestore";
import {Link, useParams} from "react-router-dom";
import Spinner from "../../../shared/components/Spinner/Spinner";
import {useTitle} from "../../../core/helpers/useTitle";
import { MdOutlineDateRange } from 'react-icons/md';

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
     * get user votes history
     * and find answer for
     * current poll
     */

    const getUserHistory = () => {
        if (!value) return
        if (!value.data()) return;


        // get user votes history
        const historyCopy = JSON.parse(localStorage.getItem("history")!) || []

        // find answer for this poll
        const lastVote = historyCopy.find((item: any) => item.id === value.data()?.id)

        return {historyCopy, lastVote}
    }

    /**
     * This method is used to
     * vote for an answer
     * @param answer
     */

    const vote = async (answer: IAnswer) => {
        let historyCopy = getUserHistory()?.historyCopy

        if (getUserHistory()?.lastVote) return;

        // create history object
        const historyItem = {
            id: value?.data()?.id,
            answer: answer
        }

        // add new poll with answer to history
        historyCopy = [...historyCopy, historyItem]
        localStorage.setItem("history", JSON.stringify(historyCopy))
        setVoted(answer)

        // increment answer counter
        const newAnswers = value?.data()?.answers.map((stateAnswer: IAnswer) => {
            if (stateAnswer.id === answer.id) {
                return {...stateAnswer, counter: stateAnswer.counter + 1}
            }

            return stateAnswer
        })

        // save to db
        const pollRef = doc(getFirestore(app), 'polls', id!)
        await updateDoc(pollRef, {
            totalVotes: increment(1),
            answers: newAnswers
        })
    }


    /**
     * This method is used to
     * set last answer for this poll
     */

    const findHistoryVote = () => {
        const lastVote = getUserHistory()?.lastVote

        if (!lastVote) return;
        setVoted(lastVote.answer)
    }


    /**
     * This method is used to
     * get human date from
     * seconds
     * @param seconds
     */

    const getDate = (seconds: number):string => {
        return new Date(seconds * 1000).toLocaleString()
    }

    /* <--- Firebase ---> */
    const [value, loading] = useDocument(
        doc(getFirestore(app), 'polls', id!),
        {
            snapshotListenOptions: {includeMetadataChanges: true},
        }
    );

    // Change title
    useTitle(value?.data()?.title)

    useEffect(() => {
        findHistoryVote()
    }, [value])

    return (
        <div className={'grid place-items-center w-full'}>
            <div className={'w-full max-w-4xl grid p-3 pt-20 md:p-5 md:min-h-screen content-center'}>

                {loading && (
                    <div className={'flex justify-center'}><Spinner/></div>
                )}


                {!loading && value && value.data() === undefined && (
                    <div className={'text-4xl md:text-5xl font-bold text-center'}>
                        Ankieta nie istnieje.
                    </div>
                )}


                {/* <--- Display after end of loading ---> */}
                {!loading && value && value.data() !== undefined && (
                    <div className={'fade-in'}>
                        {/* <--- Header with createdAt date, title and description ---> */}

                        <div className={'text-xs opacity-30 mb-3 flex gap-1 items-center'}>
                          <MdOutlineDateRange/>  {value && getDate(value.data()?.createdAt?.seconds)}
                        </div>

                        <div className={'text-4xl md:text-5xl font-bold'}>
                            {value && value.data()?.title}
                        </div>

                        <div className={'text-white-dark text-xl mt-3 w-full'}>
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


                        <div className={'flex justify-between gap-3 mt-5 flex-wrap'}>
                            <Link to={'/'}>
                                <Button text={'Strona główna'} onClick={() => {
                                }} />
                            </Link>

                            <Button text={isCopied ? 'Skopiowano link!' : 'Udostępnij'} onClick={() => sharePoll()}
                                icon={<HiShare />} />
                        </div>


                    </div>
                )}
            </div>
        </div>
    );
};

export default SinglePollView;
