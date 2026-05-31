const calculation_type_store = require("../services/requestsService");

function validate_request_payload(payload, is_partial = false) {
    const { title, description, calculation_type, status, numbers } = payload;

    if (!is_partial && (!title || !description || !calculation_type || !status)) {
        return "Не все обязательные поля заполнены";
    }

    if (calculation_type === "sum_of_squares" && numbers !== undefined && typeof numbers !== "string") {
        return "Для sum_of_squares поле numbers должно быть строкой с числами через запятую";
    }

    return null;
}

function get_all_calculation_types(req, res) {
    const { title, status, calculation_type } = req.query;
    const calculation_types = calculation_type_store.find_all({ title, status, calculation_type });
    res.json(calculation_types);
}

function get_calculation_type_by_id(req, res) {
    const id = parseInt(req.params.id);
    const calculation_type = calculation_type_store.find_one(id);

    if (!calculation_type) {
        return res.status(404).json({ error: "Услуга не найдена" });
    }

    res.json(calculation_type);
}

function create_calculation_type(req, res) {
    const validation_error = validate_request_payload(req.body);

    if (validation_error) {
        return res.status(400).json({ error: validation_error });
    }

    const new_calculation_type = calculation_type_store.create(req.body);
    res.status(201).json(new_calculation_type);
}

function update_calculation_type(req, res) {
    const id = parseInt(req.params.id);
    const validation_error = validate_request_payload(req.body, true);

    if (validation_error) {
        return res.status(400).json({ error: validation_error });
    }

    const updated_calculation_type = calculation_type_store.update(id, req.body);

    if (!updated_calculation_type) {
        return res.status(404).json({ error: "Услуга не найдена" });
    }

    res.json(updated_calculation_type);
}

function delete_calculation_type(req, res) {
    const id = parseInt(req.params.id);
    const success = calculation_type_store.remove(id);

    if (!success) {
        return res.status(404).json({ error: "Услуга не найдена" });
    }

    res.status(204).send();
}

module.exports = {
    get_all_calculation_types,
    get_calculation_type_by_id,
    create_calculation_type,
    update_calculation_type,
    delete_calculation_type
};
