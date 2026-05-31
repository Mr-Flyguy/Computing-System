import { initial_calculation_types } from "../data/calculation-types.js";

const calculation_types = initial_calculation_types.map((calculation_type) => ({ ...calculation_type }));

export function get_calculation_types() {
    return calculation_types.map((calculation_type) => ({ ...calculation_type }));
}

export function get_calculation_type_by_id(id) {
    return calculation_types.find((calculation_type) => calculation_type.id === id);
}

export function create_calculation_type_copy_from_first() {
    if (calculation_types.length === 0) {
        return null;
    }

    const first_calculation_type = calculation_types[0];
    const new_id = Math.max(...calculation_types.map((calculation_type) => calculation_type.id)) + 1;
    const calculation_type_copy = {
        ...first_calculation_type,
        id: new_id
    };

    calculation_types.push(calculation_type_copy);

    return { ...calculation_type_copy };
}

export function remove_calculation_type_by_id(id) {
    const calculation_type_index = calculation_types.findIndex((calculation_type) => calculation_type.id === id);

    if (calculation_type_index === -1) {
        return false;
    }

    calculation_types.splice(calculation_type_index, 1);
    return true;
}
