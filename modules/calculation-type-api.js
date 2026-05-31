import { ajax } from "./ajax.js";

const BASE_URL = "http://localhost:3000/calculation_type";

export function get_calculation_types(filters = {}) {
    return ajax.get(BASE_URL, filters);
}

export function post_calculation_type(data) {
    return ajax.post(BASE_URL, data);
}

export function patch_calculation_type(id, data) {
    return ajax.patch(`${BASE_URL}/${id}`, data);
}

export function get_calculation_type_by_id(id) {
    return ajax.get(`${BASE_URL}/${id}`);
}

export function delete_calculation_type(id) {
    return ajax.delete(`${BASE_URL}/${id}`);
}
