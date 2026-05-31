import { ajax } from "./ajax.js";

const BASE_URL = "http://localhost:3000/calculation_type";

export function get_calculation_types(filters = {}) {
    return ajax.get(BASE_URL, filters);
}

export function get_calculation_type_by_id(id) {
    return ajax.get(`${BASE_URL}/${id}`);
}
