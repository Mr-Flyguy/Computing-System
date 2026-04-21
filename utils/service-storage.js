import { initial_services } from "../data/services.js";

const services = initial_services.map((service) => ({ ...service }));

export function get_services() {
    return services.map((service) => ({ ...service }));
}

export function get_service_by_id(id) {
    return services.find((service) => service.id === id);
}

export function create_service_copy_from_first() {
    if (services.length === 0) {
        return null;
    }

    const first_service = services[0];
    const new_id = Math.max(...services.map((service) => service.id)) + 1;
    const service_copy = {
        ...first_service,
        id: new_id
    };

    services.push(service_copy);

    return { ...service_copy };
}

export function remove_service_by_id(id) {
    const service_index = services.findIndex((service) => service.id === id);

    if (service_index === -1) {
        return false;
    }

    services.splice(service_index, 1);
    return true;
}
