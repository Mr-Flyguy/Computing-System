export class RequestComponent {
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

    get_input_html(request_data) {
        if (request_data.calculation_type === "factorial") {
            return `n = ${request_data.n}`;
        }

        if (request_data.calculation_type === "gcd") {
            return `a = ${request_data.a}, b = ${request_data.b}`;
        }

        if (request_data.calculation_type === "solve_expression") {
            return `Выражение: ${request_data.expression}, x = ${request_data.x}`;
        }

        if (request_data.calculation_type === "sum_of_squares") {
            return `Массив: [${request_data.numbers.join(", ")}]`;
        }

        return "";
    }

    get_steps_html(request_data) {
        if (request_data.calculation_type === "factorial") {
            return `
                <ol class="mb-0">
                    <li>Берём число n = ${request_data.n}</li>
                    <li>Последовательно перемножаем числа от 1 до ${request_data.n}</li>
                    <li>Получаем результат: ${request_data.result}</li>
                </ol>
            `;
        }

        if (request_data.calculation_type === "gcd") {
            return `
                <ol class="mb-0">
                    <li>Берём числа ${request_data.a} и ${request_data.b}</li>
                    <li>Применяем алгоритм Евклида для поиска общего делителя</li>
                    <li>Вычисляем результат: ${request_data.result}</li>
                </ol>
            `;
        }

        if (request_data.calculation_type === "solve_expression") {
            return `
                <ol class="mb-0">
                    <li>Берём выражение ${request_data.expression}</li>
                    <li>Подставляем x = ${request_data.x}</li>
                    <li>Получаем результат: ${request_data.result}</li>
                </ol>
            `;
        }

        if (request_data.calculation_type === "sum_of_squares") {
            return `
                <ol class="mb-0">
                    <li>Берём массив: [${request_data.numbers.join(", ")}]</li>
                    <li>Возводим каждый элемент в квадрат</li>
                    <li>Складываем квадраты и получаем: ${request_data.result}</li>
                </ol>
            `;
        }

        return "";
    }

    get_request_history_html(requests) {
        if (requests.length === 0) {
            return `
                <div class="request-history-empty">
                    Пока нет созданных заявок по этой услуге.
                </div>
            `;
        }

        return requests
            .map((request_data, index) => `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button ${index === 0 ? "" : "collapsed"}"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#request-item-${request_data.id}"
                        >
                            Заявка #${request_data.id}: ${this.get_input_html(request_data)}
                        </button>
                    </h2>
                    <div
                        id="request-item-${request_data.id}"
                        class="accordion-collapse collapse ${index === 0 ? "show" : ""}"
                    >
                        <div class="accordion-body">
                            <p><b>Статус:</b> ${request_data.status}</p>
                            <p><b>Входные данные:</b> ${this.get_input_html(request_data)}</p>
                            <p><b>Результат:</b> ${request_data.result}</p>
                            <div>${this.get_steps_html(request_data)}</div>
                        </div>
                    </div>
                </div>
            `)
            .join("");
    }

    getHTML(service_data, requests, form_html) {
        return `
            <div class="request-page-card">
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
                    <div id="request-model-root"></div>
                </div>

                <div class="accordion" id="request-accordion">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button
                                class="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#request-info"
                            >
                                Информация
                            </button>
                        </h2>
                        <div id="request-info" class="accordion-collapse collapse show">
                            <div class="accordion-body">
                                <p><b>Описание:</b> ${service_data.description}</p>
                                <p><b>Тип вычисления:</b> ${this.get_type_label(service_data.calculation_type)}</p>
                                <p><b>Назначение:</b> Создание заявок с входными данными и автоматическим расчётом результата.</p>
                            </div>
                        </div>
                    </div>
                </div>

                ${form_html}

                <div class="request-history-block">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                        <h3 class="mb-0">Созданные заявки</h3>
                        <span class="request-info">${requests.length} шт.</span>
                    </div>
                    <div class="accordion" id="request-history-accordion">
                        ${this.get_request_history_html(requests)}
                    </div>
                </div>
            </div>
        `;
    }

    render(service_data, requests, form_html) {
        const html = this.getHTML(service_data, requests, form_html);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}
