import { initial_requests } from "../data/requests.js";

const storage_key = "math_service_requests";

function is_valid_request(request) {
    return Boolean(request)
        && typeof request.id === "number"
        && typeof request.calculation_type === "string"
        && typeof request.status === "string"
        && Object.prototype.hasOwnProperty.call(request, "result");
}

export function get_requests() {
    const saved_requests = localStorage.getItem(storage_key);

    if (saved_requests) {
        const parsed_requests = JSON.parse(saved_requests);

        if (Array.isArray(parsed_requests) && parsed_requests.every(is_valid_request)) {
            return parsed_requests;
        }
    }

    localStorage.setItem(storage_key, JSON.stringify(initial_requests));
    return [...initial_requests];
}

export function save_requests(requests) {
    localStorage.setItem(storage_key, JSON.stringify(requests));
}

export function add_request(request) {
    const requests = get_requests();
    requests.push(request);
    save_requests(requests);
}

export function delete_request(id) {
    const requests = get_requests().filter((request) => request.id !== id);
    save_requests(requests);
}

export function get_request_by_id(id) {
    return get_requests().find((request) => request.id === id);
}

export function get_requests_by_calculation_type(calculation_type) {
    return get_requests().filter((request) => request.calculation_type === calculation_type);
}

export function get_next_id() {
    const requests = get_requests();

    if (requests.length === 0) {
        return 1;
    }

    let max_id = requests[0].id;

    for (let i = 1; i < requests.length; i++) {
        if (requests[i].id > max_id) {
            max_id = requests[i].id;
        }
    }

    return max_id + 1;
}
