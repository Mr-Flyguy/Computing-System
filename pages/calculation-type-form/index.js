import { CalculationTypeHeaderComponent } from "../../components/calculation-type-header/index.js";
import { MainPage } from "../main/index.js";
import { get_calculation_type_by_id } from "../../modules/calculation-type-api.js";

function escape_html(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

export class CalculationTypeFormPage {
    constructor(parent, mode = "create", id = null, calculation_type_data = null) {
        this.parent = parent;
        this.mode = mode;
        this.id = id === null ? null : Number(id);
        this.calculation_type_data = calculation_type_data;
    }

    get page_root() {
        return document.getElementById("calculation-type-form-page");
    }

    get form_root() {
        return document.getElementById("calculation-type-form");
    }

    get title() {
        return this.mode === "edit" ? "Редактирование услуги" : "Новая услуга";
    }

    click_home() {
        const main_page = new MainPage(this.parent);
        main_page.render();
    }

    get_value(name) {
        return escape_html(this.calculation_type_data?.[name] ?? "");
    }

    get_selected(value) {
        return this.calculation_type_data?.calculation_type === value ? "selected" : "";
    }

    get_status_selected(value) {
        return this.calculation_type_data?.status === value ? "selected" : "";
    }

    getHTML() {
        return `
            <div id="calculation-type-form-page" class="app-container"></div>
        `;
    }

    get_form_html() {
        return `
            <div class="calculation-type-page-card">
                <div class="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
                    <div>
                        <h2 class="mb-2">${this.title}</h2>
                        <p class="text-muted mb-0">${this.mode === "edit" ? `ID: ${this.id}` : "Поля новой услуги вычислений"}</p>
                    </div>
                    <span class="calculation-type-status">Форма</span>
                </div>

                <form id="calculation-type-form" class="calculation-type-form-block">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label" for="calculation-type-title">Название</label>
                            <input id="calculation-type-title" class="form-control calculation-type-form-input" type="text" value="${this.get_value("title")}">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="calculation-type-kind">Тип вычисления</label>
                            <select id="calculation-type-kind" class="form-select calculation-type-form-input">
                                <option value="factorial" ${this.get_selected("factorial")}>Факториал</option>
                                <option value="gcd" ${this.get_selected("gcd")}>НОД</option>
                                <option value="sum_of_squares" ${this.get_selected("sum_of_squares")}>Сумма квадратов</option>
                                <option value="sum_unique_elements" ${this.get_selected("sum_unique_elements")}>Сумма уникальных элементов</option>
                                <option value="solve" ${this.get_selected("solve")}>Вычисление выражения</option>
                                <option value="solve_expression" ${this.get_selected("solve_expression")}>Вычисление выражения</option>
                            </select>
                        </div>

                        <div class="col-12">
                            <label class="form-label" for="calculation-type-description">Описание</label>
                            <textarea id="calculation-type-description" class="form-control calculation-type-form-input" rows="3">${this.get_value("description")}</textarea>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="calculation-type-status-input">Статус</label>
                            <select id="calculation-type-status-input" class="form-select calculation-type-form-input">
                                <option value="new" ${this.get_status_selected("new")}>new</option>
                                <option value="done" ${this.get_status_selected("done")}>done</option>
                                <option value="error" ${this.get_status_selected("error")}>error</option>
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="calculation-type-image">Изображение</label>
                            <input id="calculation-type-image" class="form-control calculation-type-form-input" type="url" value="${this.get_value("image")}">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="calculation-type-n">n</label>
                            <input id="calculation-type-n" class="form-control calculation-type-form-input" type="number" value="${this.get_value("n")}">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="calculation-type-numbers">Массив чисел</label>
                            <input id="calculation-type-numbers" class="form-control calculation-type-form-input" type="text" value="${this.get_value("numbers")}">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="calculation-type-a">a</label>
                            <input id="calculation-type-a" class="form-control calculation-type-form-input" type="number" value="${this.get_value("a")}">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="calculation-type-b">b</label>
                            <input id="calculation-type-b" class="form-control calculation-type-form-input" type="number" value="${this.get_value("b")}">
                        </div>

                        <div class="col-md-8">
                            <label class="form-label" for="calculation-type-expression">Выражение</label>
                            <input id="calculation-type-expression" class="form-control calculation-type-form-input" type="text" value="${this.get_value("expression")}">
                        </div>

                        <div class="col-md-4">
                            <label class="form-label" for="calculation-type-x">x</label>
                            <input id="calculation-type-x" class="form-control calculation-type-form-input" type="number" value="${this.get_value("x")}">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="calculation-type-result">Результат</label>
                            <input id="calculation-type-result" class="form-control calculation-type-form-input" type="text" value="${this.get_value("result")}">
                        </div>
                    </div>
                </form>
            </div>
        `;
    }

    async load_calculation_type() {
        if (this.mode !== "edit" || this.calculation_type_data || this.id === null) {
            return;
        }

        const { data, status } = await get_calculation_type_by_id(this.id);
        this.calculation_type_data = status === 200 ? data : null;
    }

    async render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const calculation_type_header = new CalculationTypeHeaderComponent(this.page_root);
        calculation_type_header.render(this.click_home.bind(this));

        await this.load_calculation_type();

        if (this.mode === "edit" && !this.calculation_type_data) {
            this.page_root.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="calculation-type-page-card">
                        <h2 class="mb-2">Услуга не найдена</h2>
                        <p class="text-muted mb-0">Выберите услугу из каталога на главной странице.</p>
                    </div>
                `
            );
            return;
        }

        this.page_root.insertAdjacentHTML("beforeend", this.get_form_html());
        this.form_root.addEventListener("submit", (event) => event.preventDefault());
    }
}
