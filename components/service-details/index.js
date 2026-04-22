export class ServiceDetailsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    get_type_label(calculation_type) {
        if (calculation_type === "factorial") {
            return "Факториал";
        }

        if (calculation_type === "gcd") {
            return "НОД";
        }

        if (calculation_type === "solve_expression") {
            return "Вычисление выражения";
        }

        return "Сумма квадратов";
    }

    get_status_label(status) {
        if (status === "new") {
            return "Новая";
        }

        if (status === "in_progress") {
            return "В работе";
        }

        if (status === "done") {
            return "Выполнена";
        }

        return status || "Без статуса";
    }

    get_request_payload_html(request_data) {
        if (request_data.type === "sum_of_squares" && request_data.numbers) {
            return `Числа: ${request_data.numbers}`;
        }

        if ((request_data.type === "solve" || request_data.type === "solve_expression") && request_data.expression) {
            return `Выражение: ${request_data.expression}, x = ${request_data.x}`;
        }

        if (request_data.type === "factorial") {
            return `n = ${request_data.n}`;
        }

        if (request_data.type === "gcd") {
            return `a = ${request_data.a}, b = ${request_data.b}`;
        }

        return "Дополнительные данные не указаны";
    }

    get_request_result_html(request_data) {
        if (request_data.result === undefined || request_data.result === null || request_data.result === "") {
            return "Результат не вычислен";
        }

        return `Результат: ${request_data.result}`;
    }

    get_requests_html(requests, search_query) {
        if (requests.length === 0) {
            return `
                <div class="request-history-empty">
                    ${search_query
        ? "По вашему запросу вычисления не найдены."
        : "По этой услуге пока нет сохранённых вычислений."}
                </div>
            `;
        }

        return requests
            .map((request_data) => `
                <div class="request-extra-item">
                    <div>
                        <div class="request-extra-key">Вычисление #${request_data.id}</div>
                        <div class="request-extra-value request-extra-value-left">
                            ${request_data.title}
                        </div>
                        <div class="request-extra-muted">
                            ${this.get_request_payload_html(request_data)}
                        </div>
                        <div class="request-extra-result">
                            ${this.get_request_result_html(request_data)}
                        </div>
                    </div>
                    <div class="request-extra-actions">
                        <span class="request-status">${this.get_status_label(request_data.status)}</span>
                        <button
                            class="btn btn-outline-secondary pm-btn-outline"
                            id="request-edit-${request_data.id}"
                            data-id="${request_data.id}"
                        >
                            Редактировать
                        </button>
                    </div>
                </div>
            `)
            .join("");
    }

    getHTML(service_data, requests, search_query) {
        return `
            <div class="service-page-card">
                <div class="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
                    <div>
                        <h2 class="mb-2">${service_data.title}</h2>
                        <p class="text-muted mb-0">${service_data.description}</p>
                    </div>
                    <span class="request-status">Услуга вычислений</span>
                </div>

                <div class="request-media">
                    <div class="request-image-block">
                        <img class="request-image" src="${service_data.image}" alt="Изображение услуги">
                    </div>
                    <div id="service-model-root"></div>
                </div>

                <div class="request-detail-grid">
                    <div class="request-detail-item">
                        <div class="request-detail-label">Тип</div>
                        <div class="request-detail-value">${this.get_type_label(service_data.calculation_type)}</div>
                    </div>
                    <div class="request-detail-item">
                        <div class="request-detail-label">Описание</div>
                        <div class="request-detail-value request-detail-value-text">
                            Введите данные и получите готовый результат вычисления.
                        </div>
                    </div>
                </div>

                <div class="request-history-block">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                        <h3 class="mb-0">История вычислений</h3>
                        <div id="request-create-button"></div>
                    </div>
                    <form id="request-search-form" class="service-search-block service-search-inline-block">
                        <label class="service-search-label" for="request-search-input">Поиск по названию вычисления</label>
                        <div class="request-search-row">
                            <input
                                id="request-search-input"
                                class="form-control service-search-input"
                                type="text"
                                placeholder="Например, факториал или сумма квадратов"
                                value="${search_query}"
                            >
                            <button type="submit" class="btn btn-outline-secondary pm-btn-outline">
                                Найти
                            </button>
                        </div>
                    </form>
                    <div class="request-extra-grid">
                        ${this.get_requests_html(requests, search_query)}
                    </div>
                </div>
            </div>
        `;
    }

    render(service_data, requests, search_query) {
        const html = this.getHTML(service_data, requests, search_query);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}
