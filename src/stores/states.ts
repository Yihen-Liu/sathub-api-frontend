import {atom} from "recoil";

export const jwtState = atom(
    {
        key:"jwtStateTag",
        default:""
    }
);
