import { License } from "./license";

export interface User{
    id: string;
    name: string;
    dateOfBirth: string;
    address: string;

    licenses?: License[];
}