import { ajax } from "./ajax.js";

const BASE_URL = "/calculation_type";

export async function getCalculationTypes() {
    return ajax.get(BASE_URL);
}

export async function getCalculationTypeById(id) {
    return ajax.get(`${BASE_URL}/${id}`);
}
