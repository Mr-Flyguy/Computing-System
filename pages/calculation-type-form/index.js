import { CalculationTypeHeaderComponent } from "../../components/calculation-type-header/index.js";
import { MainPage } from "../main/index.js";
import {
    create_calculation_type,
    get_calculation_type_by_id,
    update_calculation_type
} from "../../modules/calculation-type-api.js";

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

    get error_root() {
        return document.getElementById("calculation-type-form-error");
    }

    get submit_button() {
        return document.getElementById("calculation-type-submit-button");
    }

    get title() {
        return this.mode === "edit" ? "Редактирование услуги" : "Новая услуга";
    }

    get submit_text() {
        return this.mode === "edit" ? "Сохранить" : "Добавить";
    }

    click_home() {
        const main_page = new MainPage(this.parent);
        main_page.render();
    }

    get_value(name) {
        return escape_html(this.calculation_type_data?.[name] ?? "");
    }

    get_selected(value) {
        if (value === "solve") {
            return ["solve", "solve_expression"].includes(this.calculation_type_data?.calculation_type) ? "selected" : "";
        }

        return this.calculation_type_data?.calculation_type === value ? "selected" : "";
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
                        <p class="text-muted mb-0">${this.mode === "edit" ? `ID: ${this.id}` : "Поля нового типа вычислений"}</p>
                    </div>
                    <span class="calculation-type-status">Форма</span>
                </div>

                <div id="calculation-type-form-error" class="calculation-type-error d-none"></div>

                <form id="calculation-type-form" class="calculation-type-form-block">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label" for="calculation-type-title">Название</label>
                            <input id="calculation-type-title" class="form-control calculation-type-form-input" type="text" value="${this.get_value("title")}">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label" for="calculation-type-kind">Тип</label>
                            <select id="calculation-type-kind" class="form-select calculation-type-form-input">
                                <option value="factorial" ${this.get_selected("factorial")}>Факториал</option>
                                <option value="gcd" ${this.get_selected("gcd")}>НОД</option>
                                <option value="sum_of_squares" ${this.get_selected("sum_of_squares")}>Сумма квадратов</option>
                                <option value="sum_unique_elements" ${this.get_selected("sum_unique_elements")}>Сумма уникальных элементов</option>
                                <option value="solve" ${this.get_selected("solve")}>Вычисление выражения</option>
                            </select>
                        </div>

                        <div class="col-12">
                            <label class="form-label" for="calculation-type-description">Описание</label>
                            <textarea id="calculation-type-description" class="form-control calculation-type-form-input" rows="3">${this.get_value("description")}</textarea>
                        </div>

                        <div class="col-12">
                            <button id="calculation-type-submit-button" class="btn btn-danger pm-btn" type="submit">
                                ${this.submit_text}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        `;
    }

    get_form_data() {
        return {
            title: document.getElementById("calculation-type-title").value.trim(),
            description: document.getElementById("calculation-type-description").value.trim(),
            calculation_type: document.getElementById("calculation-type-kind").value
        };
    }

    show_error(message) {
        this.error_root.textContent = message;
        this.error_root.classList.remove("d-none");
    }

    set_saving_state(is_saving) {
        this.submit_button.disabled = is_saving;
        this.submit_button.textContent = is_saving ? "Сохранение..." : this.submit_text;
    }

    async save_calculation_type(event) {
        event.preventDefault();
        const form_data = this.get_form_data();

        if (!form_data.title || !form_data.description || !form_data.calculation_type) {
            this.show_error("Заполните название, описание и тип.");
            return;
        }

        this.error_root.classList.add("d-none");
        this.set_saving_state(true);

        const payload = this.mode === "edit" ? form_data : {
            ...form_data,
            status: "new"
        };

        const { status } = this.mode === "edit"
            ? await update_calculation_type(this.id, payload)
            : await create_calculation_type(payload);

        this.set_saving_state(false);

        if ((this.mode === "edit" && status !== 200) || (this.mode === "create" && status !== 201)) {
            this.show_error("Не удалось сохранить тип вычислений.");
            return;
        }

        const main_page = new MainPage(this.parent);
        main_page.render();
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
        this.form_root.addEventListener("submit", this.save_calculation_type.bind(this));
    }
}
