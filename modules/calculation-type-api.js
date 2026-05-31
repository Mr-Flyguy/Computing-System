const BASE_URL = "/calculation_type";

function build_url(url, params = {}) {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && String(value).trim() !== "") {
            query.append(key, value);
        }
    });

    const query_string = query.toString();
    return query_string ? `${url}?${query_string}` : url;
}

function get_no_cache_options() {
    return {
        cache: "no-store",
        headers: {
            "Cache-Control": "no-cache, no-store, max-age=0",
            "Pragma": "no-cache"
        }
    };
}

async function fetch_json(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const text = await response.text();

        return {
            data: text ? JSON.parse(text) : null,
            status: response.status
        };
    } catch (error) {
        console.error("Ошибка выполнения запроса:", error);

        return {
            data: null,
            status: 0
        };
    }
}

function json_options(method, data) {
    return {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
}

export async function get_calculation_types(filters = {}) {
    return fetch_json(
        build_url(BASE_URL, { ...filters, cache_buster: Date.now() }),
        get_no_cache_options()
    );
}

export async function get_calculation_type_by_id(id) {
    return fetch_json(
        build_url(`${BASE_URL}/${id}`, { cache_buster: Date.now() }),
        get_no_cache_options()
    );
}

export async function create_calculation_type(data) {
    return fetch_json(BASE_URL, json_options("POST", data));
}

export async function update_calculation_type(id, data) {
    return fetch_json(`${BASE_URL}/${id}`, json_options("PATCH", data));
}

export async function delete_calculation_type(id) {
    return fetch_json(`${BASE_URL}/${id}`, { method: "DELETE" });
}
