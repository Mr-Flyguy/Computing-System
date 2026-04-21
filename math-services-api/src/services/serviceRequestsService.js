const file_service = require("./fileService");

let data_file_path;

function normalize_service_request(service_request) {
    if (!service_request) {
        return service_request;
    }

    const normalized_service_request = {
        ...service_request
    };

    if (normalized_service_request.type === "sum_of_squares" && Array.isArray(normalized_service_request.numbers)) {
        normalized_service_request.numbers = normalized_service_request.numbers.join(", ");
    }

    return normalized_service_request;
}

function read_service_requests() {
    const service_requests = file_service.read_data(data_file_path).map(normalize_service_request);
    file_service.write_data(data_file_path, service_requests);
    return service_requests;
}

function init(file_path) {
    data_file_path = file_path;
    read_service_requests();
}

function find_all(filters) {
    let service_requests = read_service_requests();

    if (filters.title) {
        service_requests = service_requests.filter((service_request) =>
            service_request.title.toLowerCase().includes(filters.title.toLowerCase())
        );
    }

    if (filters.status) {
        service_requests = service_requests.filter(
            (service_request) => service_request.status.toLowerCase() === filters.status.toLowerCase()
        );
    }

    if (filters.type) {
        service_requests = service_requests.filter(
            (service_request) => service_request.type.toLowerCase() === filters.type.toLowerCase()
        );
    }

    return service_requests;
}

function find_one(id) {
    const service_requests = read_service_requests();
    return service_requests.find((service_request) => service_request.id === id);
}

function create(service_request_data) {
    const service_requests = read_service_requests();

    const new_id =
        service_requests.length > 0
            ? Math.max(...service_requests.map((service_request) => service_request.id)) + 1
            : 1;

    const new_service_request = {
        id: new_id,
        ...normalize_service_request(service_request_data)
    };

    service_requests.push(new_service_request);
    file_service.write_data(data_file_path, service_requests);

    return new_service_request;
}

function update(id, service_request_data) {
    const service_requests = read_service_requests();
    const index = service_requests.findIndex((service_request) => service_request.id === id);

    if (index === -1) {
        return null;
    }

    service_requests[index] = normalize_service_request({
        ...service_requests[index],
        ...service_request_data
    });

    file_service.write_data(data_file_path, service_requests);
    return service_requests[index];
}

function remove(id) {
    const service_requests = read_service_requests();
    const filtered_service_requests = service_requests.filter((service_request) => service_request.id !== id);

    if (filtered_service_requests.length === service_requests.length) {
        return false;
    }

    file_service.write_data(data_file_path, filtered_service_requests);
    return true;
}

module.exports = {
    init,
    find_all,
    find_one,
    create,
    update,
    remove
};
