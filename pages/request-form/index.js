import { BackButtonComponent } from "../../components/back-button/index.js";
import { ServicePage } from "../service/index.js";
import { ajax } from "../../modules/ajax.js";
import { requestUrls } from "../../modules/requestUrls.js";
import { get_service_by_id } from "../../utils/service-storage.js";
import { factorial, gcd, solveExpression, sumOfSquares } from "../../utils/calculations.js";

export class RequestFormPage {
    constructor(parent, service_id, request_id = null) {
        this.parent = parent;
        this.service_id = Number(service_id);
        this.request_id = request_id;
    }

    get page_root() {
        return document.getElementById("request-form-page");
    }

    get is_edit_mode() {
        return this.request_id !== null;
    }

    get service() {
        return get_service_by_id(this.service_id);
    }

    get request_type() {
        if (!this.service) {
            return "";
        }

        if (this.service.calculation_type === "solve_expression") {
            return "solve";
        }

        return this.service.calculation_type;
    }

    get default_request() {
        return {
            title: this.service ? this.service.title : "",
            description: "",
            type: this.request_type,
            status: "done"
        };
    }

    getHTML() {
        return `
            <div id="request-form-page" class="app-container"></div>
        `;
    }

    click_back() {
        const service_page = new ServicePage(this.parent, this.service_id);
        service_page.render();
    }

    get_dynamic_fields_html(request_data) {
        if (this.request_type === "sum_of_squares") {
            return `
                <div class="col-12">
                    <label class="form-label" for="request-numbers">Числа через запятую</label>
                    <input
                        id="request-numbers"
                        class="form-control"
                        type="text"
                        value="${request_data.numbers || ""}"
                        required
                    >
                </div>
            `;
        }

        if (this.request_type === "solve" || this.request_type === "solve_expression") {
            return `
                <div class="col-md-8">
                    <label class="form-label" for="request-expression">Выражение</label>
                    <input
                        id="request-expression"
                        class="form-control"
                        type="text"
                        value="${request_data.expression || ""}"
                        required
                    >
                </div>
                <div class="col-md-4">
                    <label class="form-label" for="request-x">Значение x</label>
                    <input
                        id="request-x"
                        class="form-control"
                        type="number"
                        value="${request_data.x ?? ""}"
                        required
                    >
                </div>
            `;
        }

        if (this.request_type === "factorial") {
            return `
                <div class="col-md-6">
                    <label class="form-label" for="request-n">Число n</label>
                    <input
                        id="request-n"
                        class="form-control"
                        type="number"
                        min="0"
                        value="${request_data.n ?? ""}"
                        required
                    >
                </div>
            `;
        }

        if (this.request_type === "gcd") {
            return `
                <div class="col-md-6">
                    <label class="form-label" for="request-a">Число a</label>
                    <input
                        id="request-a"
                        class="form-control"
                        type="number"
                        value="${request_data.a ?? ""}"
                        required
                    >
                </div>
                <div class="col-md-6">
                    <label class="form-label" for="request-b">Число b</label>
                    <input
                        id="request-b"
                        class="form-control"
                        type="number"
                        value="${request_data.b ?? ""}"
                        required
                    >
                </div>
            `;
        }

        return "";
    }

    get_form_html(request_data) {
        return `
            <div class="service-page-card">
                <div class="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
                    <div>
                        <h2 class="mb-2">${this.is_edit_mode ? "Редактирование вычисления" : "Новое вычисление"}</h2>
                        <p class="text-muted mb-0">
                            Услуга: ${this.service ? this.service.title : "не найдена"}
                        </p>
                        <p class="text-muted mb-0">
                            ${this.is_edit_mode
        ? "Измените входные данные и сохраните обновлённый результат."
        : "Введите исходные данные для выполнения вычисления."}
                        </p>
                    </div>
                    <span class="request-status">${this.is_edit_mode ? "Изменение" : "Новое"}</span>
                </div>

                <div id="request-form-error" class="request-error d-none"></div>

                <form id="request-form" class="service-request-form-block">
                    <div class="row g-3">
                        <div class="col-12">
                            <label class="form-label" for="request-title">Название</label>
                            <input
                                id="request-title"
                                class="form-control"
                                type="text"
                                value="${request_data.title || (this.service ? this.service.title : "")}"
                                required
                            >
                        </div>

                        <div class="col-12">
                            <label class="form-label" for="request-description">Описание</label>
                            <textarea
                                id="request-description"
                                class="form-control"
                                rows="3"
                            required
                        >${request_data.description || this.get_default_description()}</textarea>
                        </div>

                        <div id="request-dynamic-fields" class="row g-3">
                            ${this.get_dynamic_fields_html(request_data)}
                        </div>

                        <div class="col-12">
                            <button type="submit" class="btn btn-danger pm-btn">
                                ${this.is_edit_mode ? "Сохранить изменения" : "Выполнить вычисление"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        `;
    }

    bind_form_events() {
        const form = document.getElementById("request-form");
        form.addEventListener("submit", this.submit_form.bind(this));
    }

    show_error(message) {
        const error_root = document.getElementById("request-form-error");

        if (!error_root) {
            return;
        }

        error_root.textContent = message;
        error_root.classList.remove("d-none");
    }

    hide_error() {
        const error_root = document.getElementById("request-form-error");

        if (!error_root) {
            return;
        }

        error_root.textContent = "";
        error_root.classList.add("d-none");
    }

    collect_form_data() {
        const data = {
            title: document.getElementById("request-title").value.trim(),
            description: document.getElementById("request-description").value.trim(),
            type: this.request_type,
            status: "done"
        };

        if (this.request_type === "sum_of_squares") {
            data.numbers = document.getElementById("request-numbers").value.trim();
        }

        if (this.request_type === "solve" || this.request_type === "solve_expression") {
            data.expression = document.getElementById("request-expression").value.trim();
            data.x = Number(document.getElementById("request-x").value);
        }

        if (this.request_type === "factorial") {
            data.n = Number(document.getElementById("request-n").value);
        }

        if (this.request_type === "gcd") {
            data.a = Number(document.getElementById("request-a").value);
            data.b = Number(document.getElementById("request-b").value);
        }

        return data;
    }

    get_default_description() {
        if (!this.service) {
            return "";
        }

        if (this.request_type === "sum_of_squares") {
            return "Вычислить сумму квадратов введённого массива чисел";
        }

        if (this.request_type === "solve") {
            return "Вычислить значение выражения при заданном x";
        }

        if (this.request_type === "factorial") {
            return "Вычислить факториал числа n";
        }

        if (this.request_type === "gcd") {
            return "Вычислить НОД двух чисел";
        }

        return this.service.description;
    }

    get_result(request_data) {
        if (this.request_type === "sum_of_squares") {
            return sumOfSquares(request_data.numbers);
        }

        if (this.request_type === "solve") {
            return solveExpression(request_data.expression, request_data.x);
        }

        if (this.request_type === "factorial") {
            return factorial(request_data.n);
        }

        if (this.request_type === "gcd") {
            return gcd(request_data.a, request_data.b);
        }

        return null;
    }

    submit_form(event) {
        event.preventDefault();
        this.hide_error();

        const request_data = this.collect_form_data();
        request_data.result = this.get_result(request_data);

        if (this.is_edit_mode) {
            ajax.patch(requestUrls.updateRequestById(this.request_id), request_data, (_, status) => {
                if (status === 200) {
                    this.click_back();
                    return;
                }

                this.show_error("Не удалось сохранить изменения.");
            });

            return;
        }

        ajax.post(requestUrls.createRequest(), request_data, (_, status) => {
            if (status === 201) {
                this.click_back();
                return;
            }

            this.show_error("Не удалось сохранить вычисление.");
        });
    }

    render_form(request_data) {
        this.page_root.insertAdjacentHTML("beforeend", this.get_form_html(request_data));
        this.bind_form_events();
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const back_button = new BackButtonComponent(this.page_root);
        back_button.render(this.click_back.bind(this));

        if (!this.service) {
            this.page_root.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="request-error">
                        Услуга не найдена.
                    </div>
                `
            );
            return;
        }

        if (this.is_edit_mode) {
            ajax.get(requestUrls.getRequestById(this.request_id), (data, status) => {
                if (status === 200) {
                    this.render_form(data);
                    return;
                }

                this.page_root.insertAdjacentHTML(
                    "beforeend",
                    `
                        <div class="request-error">
                            Не удалось загрузить данные для редактирования.
                        </div>
                    `
                );
            });

            return;
        }

        this.render_form(this.default_request);
    }
}
