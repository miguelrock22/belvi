import {url_api} from "./../constants/api";

export const getAllTreatments = `${url_api}treatments`;

export const getTreatmentById = tid => {
    return `${url_api}/treatments/${tid}`;
}