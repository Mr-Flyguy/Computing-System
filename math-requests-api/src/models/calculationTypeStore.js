const file_store = require("./fileStore");

let data_file_path;

function normalize_calculation_type(calculation_type) {
    if (!calculation_type) {
        return calculation_type;
    }

    const normalized_calculation_type = {
        ...calculation_type
    };

    // For numeric-array calculation types, ensure `numbers` is a flat array (no nested arrays)
    if (
        normalized_calculation_type.calculation_type === "sum_unique_elements" &&
        Array.isArray(normalized_calculation_type.numbers)
    ) {
        // flatten one level (defensive, atomic change)
        const flattened = normalized_calculation_type.numbers.reduce((acc, cur) => {
            if (Array.isArray(cur)) return acc.concat(cur);
            return acc.concat(cur);
        }, []);

        normalized_calculation_type.numbers = flattened;
    }

    return normalized_calculation_type;
}

function read_calculation_types() {
    return file_store.read_data(data_file_path).map(normalize_calculation_type);
}

function init(file_path) {
    data_file_path = file_path;
    read_calculation_types();
}

function find_all(filters) {
    let calculation_types = read_calculation_types();

    if (filters.title) {
        calculation_types = calculation_types.filter((calculation_type) =>
            calculation_type.title.toLowerCase().includes(filters.title.toLowerCase())
        );
    }

    if (filters.status) {
        calculation_types = calculation_types.filter(
            (calculation_type) => calculation_type.status.toLowerCase() === filters.status.toLowerCase()
        );
    }

    if (filters.calculation_type) {
        calculation_types = calculation_types.filter(
            (calculation_type) => calculation_type.calculation_type.toLowerCase() === filters.calculation_type.toLowerCase()
        );
    }

    return calculation_types;
}

function find_one(id) {
    const calculation_types = read_calculation_types();
    return calculation_types.find((calculation_type) => calculation_type.id === id);
}

function create(calculation_type_data) {
    const calculation_types = read_calculation_types();

    const new_id =
        calculation_types.length > 0
            ? Math.max(...calculation_types.map((calculation_type) => calculation_type.id)) + 1
            : 1;

    const new_calculation_type = {
        id: new_id,
        ...normalize_calculation_type(calculation_type_data)
    };

    calculation_types.push(new_calculation_type);
    file_store.write_data(data_file_path, calculation_types);

    return new_calculation_type;
}

function update(id, calculation_type_data) {
    const calculation_types = read_calculation_types();
    const index = calculation_types.findIndex((calculation_type) => calculation_type.id === id);

    if (index === -1) {
        return null;
    }

    calculation_types[index] = normalize_calculation_type({
        ...calculation_types[index],
        ...calculation_type_data
    });

    file_store.write_data(data_file_path, calculation_types);
    return calculation_types[index];
}

function remove(id) {
    const calculation_types = read_calculation_types();
    const filtered_calculation_types = calculation_types.filter((calculation_type) => calculation_type.id !== id);

    if (filtered_calculation_types.length === calculation_types.length) {
        return false;
    }

    file_store.write_data(data_file_path, filtered_calculation_types);
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
