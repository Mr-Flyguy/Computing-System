import { initial_services } from "../data/services.js";

export function get_services() {
    return [...initial_services];
}

export function get_service_by_id(id) {
    return initial_services.find((service) => service.id === id);
}
