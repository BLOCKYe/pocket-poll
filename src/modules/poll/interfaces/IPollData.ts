import {FieldValue} from "@firebase/firestore";

export interface IPollData {
    createdAt:   FieldValue;
    description: string;
    id:          string;
    answers:     Answer[];
    totalVotes:  number;
    title:       string;
}

export interface Answer {
    counter: number;
    id:      string;
    content: string;
}

export interface CreatedAt {
    seconds:     number;
    nanoseconds: number;
}
