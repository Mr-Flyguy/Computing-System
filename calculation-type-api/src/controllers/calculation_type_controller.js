const calculation_type_store = require("../models/calculation_type_store");

const ALLOWED_CALCULATION_TYPES = new Set([
    "factorial",
    "gcd",
    "sum_of_squares",
    "solve_expression",
    "sum_unique_elements"
]);

function validate_calculation_type_payload(payload = {}, is_partial = false) {
    const { title, description, calculation_type } = payload;

    if (!is_partial && (!title || !description || !calculation_type)) {
        return "Не все обязательные поля заполнены";
    }

    if (
        calculation_type !== undefined &&
        !ALLOWED_CALCULATION_TYPES.has(calculation_type)
    ) {
        return "Неизвестный тип вычислений";
    }

    return null;
}

function get_all_calculation_types(req, res) {
    const { title, calculation_type } = req.query;
    const calculation_types = calculation_type_store.find_all({ title, calculation_type });
    res.json(calculation_types);
}

function get_calculation_type_by_id(req, res) {
    const id = Number.parseInt(req.params.id, 10);
    const calculation_type = calculation_type_store.find_one(id);

    if (!calculation_type) {
        return res.status(404).json({ error: "Услуга не найдена" });
    }

    res.json(calculation_type);
}

function create_calculation_type(req, res) {
    const validation_error = validate_calculation_type_payload(req.body);

    if (validation_error) {
        return res.status(400).json({ error: validation_error });
    }

    const new_calculation_type = calculation_type_store.create(req.body);
    res.status(201).json(new_calculation_type);
}

function update_calculation_type(req, res) {
    const id = Number.parseInt(req.params.id, 10);
    const validation_error = validate_calculation_type_payload(req.body, true);

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
    const id = Number.parseInt(req.params.id, 10);
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
