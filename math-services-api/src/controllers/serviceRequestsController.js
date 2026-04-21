const service_requests_service = require("../services/serviceRequestsService");

function validate_service_request_payload(payload, is_partial = false) {
    const { title, description, type, status, numbers } = payload;

    if (!is_partial && (!title || !description || !type || !status)) {
        return "Не все обязательные поля заполнены";
    }

    if (type === "sum_of_squares" && numbers !== undefined && typeof numbers !== "string") {
        return "Для sum_of_squares поле numbers должно быть строкой с числами через запятую";
    }

    return null;
}

function get_all_service_requests(req, res) {
    const { title, status, type } = req.query;
    const service_requests = service_requests_service.find_all({ title, status, type });
    res.json(service_requests);
}

function get_service_request_by_id(req, res) {
    const id = parseInt(req.params.id);
    const service_request = service_requests_service.find_one(id);

    if (!service_request) {
        return res.status(404).json({ error: "Заявка не найдена" });
    }

    res.json(service_request);
}

function create_service_request(req, res) {
    const validation_error = validate_service_request_payload(req.body);

    if (validation_error) {
        return res.status(400).json({ error: validation_error });
    }

    const new_service_request = service_requests_service.create(req.body);
    res.status(201).json(new_service_request);
}

function update_service_request(req, res) {
    const id = parseInt(req.params.id);
    const validation_error = validate_service_request_payload(req.body, true);

    if (validation_error) {
        return res.status(400).json({ error: validation_error });
    }

    const updated_service_request = service_requests_service.update(id, req.body);

    if (!updated_service_request) {
        return res.status(404).json({ error: "Заявка не найдена" });
    }

    res.json(updated_service_request);
}

function delete_service_request(req, res) {
    const id = parseInt(req.params.id);
    const success = service_requests_service.remove(id);

    if (!success) {
        return res.status(404).json({ error: "Заявка не найдена" });
    }

    res.status(204).send();
}

module.exports = {
    get_all_service_requests,
    get_service_request_by_id,
    create_service_request,
    update_service_request,
    delete_service_request
};
