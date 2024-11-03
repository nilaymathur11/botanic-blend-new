import { Dispatch, SetStateAction } from "react";

export interface CustomSelectProps {
    options: {
        value: string;
        label: string;
    }[];
    value: SetStateAction<string>
    onChange: Dispatch<SetStateAction<string>>;
    label: string;
}