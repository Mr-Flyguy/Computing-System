async function fetch_json(url) {
    try {
        const response = await fetch(url);
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

const BASE_URL = "/calculation_type";

export async function getCalculationTypes() {
    return fetch_json(BASE_URL);
}

export async function getCalculationTypeById(id) {
    return fetch_json(`${BASE_URL}/${id}`);
}
