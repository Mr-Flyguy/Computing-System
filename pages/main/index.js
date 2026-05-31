import { CalculationTypeCardComponent } from "../../components/calculation-type-card/index.js";
import { ButtonComponent } from "../../components/button/index.js";
import { CalculationTypePage } from "../calculation-type/index.js";
import { CalculationTypeFormPage } from "../calculation-type-form/index.js";
import { get_calculation_types } from "../../modules/calculation-type-api.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.search_query = "";
        this.calculation_types = [];
        this.is_loading = false;
        this.error_message = "";
    }

    get calculation_type_list_root() {
        return document.getElementById("calculation-type-list");
    }

    get search_input() {
        return document.getElementById("calculation-type-search-input");
    }

    get empty_state_root() {
        return document.getElementById("calculation-type-empty-state");
    }

    get counter_root() {
        return document.getElementById("calculation-type-counter");
    }

    get add_calculation_type_button_root() {
        return document.getElementById("new-calculation-type-button");
    }

    getHTML() {
        return `
            <div id="main-page" class="app-container">
                <div class="hero-block">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h1 class="hero-title">Услуги вычислений</h1>
                            <p class="hero-text">
                                Каталог вычислительных услуг: факториал, НОД и сумма уникальных элементов
                            </p>
                        </div>

                        <div class="calculation-type-counter-badge">
                            <span id="calculation-type-counter">Кол-во услуг: ${this.calculation_types.length}</span>
                        </div>
                    </div>

                    <div class="calculation-type-search-block">
                        <label class="calculation-type-search-label" for="calculation-type-search-input">Поиск по названию</label>
                        <input
                            id="calculation-type-search-input"
                            class="form-control calculation-type-search-input"
                            type="text"
                            placeholder="Например, сумма или факториал"
                            value="${this.search_query}"
                        >
                    </div>

                    <div class="calculation-type-actions mt-3 mb-0">
                        <div id="new-calculation-type-button" class="calculation-type-action-item"></div>
                    </div>
                </div>

                <div id="calculation-type-error" class="calculation-type-error d-none"></div>
                <div id="calculation-type-list" class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4"></div>
                <div
                    id="calculation-type-empty-state"
                    class="calculation-type-empty d-none"
                >
                    По вашему запросу услуги не найдены.
                </div>
            </div>
        `;
    }

    click_card(event) {
        const calculation_type_id = Number(event.currentTarget.dataset.id);
        const calculation_type_page = new CalculationTypePage(this.parent, calculation_type_id);
        calculation_type_page.render();
    }

    handle_search(event) {
        this.search_query = event.target.value;
        this.load_calculation_types();
    }

    open_create_page() {
        const form_page = new CalculationTypeFormPage(this.parent);
        form_page.render();
    }

    async load_calculation_types() {
        this.is_loading = true;
        this.error_message = "";
        this.update_calculation_type_list();

        const filters = this.search_query.trim() ? { title: this.search_query.trim() } : {};
        const { data, status } = await get_calculation_types(filters);

        this.is_loading = false;

        if (status === 200 && Array.isArray(data)) {
            this.calculation_types = data;
        } else {
            this.calculation_types = [];
            this.error_message = "Не удалось загрузить список услуг вычислений.";
        }

        this.update_calculation_type_list();
    }

    update_calculation_type_list() {
        const error_root = document.getElementById("calculation-type-error");
        this.calculation_type_list_root.innerHTML = "";

        if (this.is_loading) {
            this.calculation_type_list_root.insertAdjacentHTML(
                "beforeend",
                `<div class="col-12"><div class="calculation-type-empty">Загрузка...</div></div>`
            );
        }

        this.calculation_types.forEach((calculation_type_data) => {
            const calculation_type_card = new CalculationTypeCardComponent(this.calculation_type_list_root);
            calculation_type_card.render(calculation_type_data, this.click_card.bind(this));
        });

        this.counter_root.textContent = `Кол-во услуг: ${this.calculation_types.length}`;
        this.empty_state_root.classList.toggle("d-none", this.is_loading || this.calculation_types.length > 0);
        error_root.textContent = this.error_message;
        error_root.classList.toggle("d-none", !this.error_message);
    }

    async render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());
        this.search_input.addEventListener("input", this.handle_search.bind(this));

        const add_calculation_type_button = new ButtonComponent(this.add_calculation_type_button_root);
        add_calculation_type_button.render(
            "Новая услуга",
            "new-calculation-type-action",
            this.open_create_page.bind(this),
            "btn btn-danger pm-btn"
        );

        await this.load_calculation_types();
    }
}
