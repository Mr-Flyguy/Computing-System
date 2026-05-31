import { CalculationTypeCardComponent } from "../../components/calculation-type-card/index.js";
import { ButtonComponent } from "../../components/button/index.js";
import { CalculationTypeHeaderComponent } from "../../components/calculation-type-header/index.js";
import { CalculationTypePage } from "../calculation-type/index.js";
import {
    create_calculation_type_copy_from_first,
    get_calculation_types,
    remove_calculation_type_by_id
} from "../../utils/calculation-type-storage.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.search_query = "";
    }

    get calculation_type_list_root() {
        return document.getElementById("calculation-type-list");
    }

    get search_input() {
        return document.getElementById("calculation-type-search-input");
    }

    get empty_state_root() {
        return document.getElementById("calculation-type-search-empty");
    }

    get counter_root() {
        return document.getElementById("calculation-type-counter");
    }

    get add_calculation_type_button_root() {
        return document.getElementById("add-calculation-type-button");
    }

    get page_root() {
        return document.getElementById("main-page");
    }

    get_filtered_calculation_types() {
        const calculation_types = get_calculation_types();
        const normalized_query = this.search_query.trim().toLowerCase();

        if (!normalized_query) {
            return calculation_types;
        }

        return calculation_types.filter((calculation_type) =>
            calculation_type.title.toLowerCase().includes(normalized_query)
        );
    }

    getHTML() {
        const calculation_types = get_calculation_types();
        const filtered_calculation_types = this.get_filtered_calculation_types();

        return `
            <div id="main-page" class="app-container">
                <div class="hero-block">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h1 class="hero-title">Услуги вычислений</h1>
                            <p class="hero-text">
                                Каталог вычислительных услуг: факториал, НОД и сумма квадратов
                            </p>
                        </div>

                        <div class="calculation-type-counter-badge">
                            <span id="calculation-type-counter">Кол-во услуг: ${calculation_types.length}</span>
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

                    <div class="mt-3">
                        <div id="add-calculation-type-button" class="d-inline-flex"></div>
                    </div>
                </div>

                <div id="calculation-type-list" class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4"></div>
                <div
                    id="calculation-type-search-empty"
                    class="calculation-type-empty${filtered_calculation_types.length ? " d-none" : ""}"
                >
                    По вашему запросу услуги не найдены.
                </div>
            </div>
        `;
    }

    click_card(event) {
        const calculation_type_id = Number(event.target.dataset.id);
        const calculation_type_page = new CalculationTypePage(this.parent, calculation_type_id);
        calculation_type_page.render();
    }

    handle_search(event) {
        this.search_query = event.target.value;
        this.update_calculation_type_list();
    }

    add_calculation_type() {
        create_calculation_type_copy_from_first();
        this.update_calculation_type_list();
    }

    delete_calculation_type(event) {
        const calculation_type_id = Number(event.target.dataset.id);
        remove_calculation_type_by_id(calculation_type_id);
        this.update_calculation_type_list();
    }

    update_calculation_type_list() {
        const calculation_types = get_calculation_types();
        const filtered_calculation_types = this.get_filtered_calculation_types();
        this.calculation_type_list_root.innerHTML = "";

        filtered_calculation_types.forEach((calculation_type_data) => {
            const calculation_type_card = new CalculationTypeCardComponent(this.calculation_type_list_root);
            calculation_type_card.render(
                calculation_type_data,
                this.click_card.bind(this),
                this.delete_calculation_type.bind(this)
            );
        });

        this.counter_root.textContent = `Кол-во услуг: ${calculation_types.length}`;
        this.empty_state_root.classList.toggle("d-none", filtered_calculation_types.length > 0);
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const calculation_type_header = new CalculationTypeHeaderComponent(this.page_root);
        calculation_type_header.render(() => {}, true);

        this.search_input.addEventListener("input", this.handle_search.bind(this));

        const add_calculation_type_button = new ButtonComponent(this.add_calculation_type_button_root);
        add_calculation_type_button.render(
            "Добавить услугу",
            "add-calculation-type-action",
            this.add_calculation_type.bind(this),
            "btn btn-danger pm-btn"
        );

        this.update_calculation_type_list();
    }
}
