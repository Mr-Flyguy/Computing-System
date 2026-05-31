import { CalculationTypeCardComponent } from "../../components/calculation-type-card/index.js";
import { CalculationTypePage } from "../calculation-type/index.js";
import { getCalculationTypes } from "../../modules/calculation-type-api.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.search_query = "";
        this.calculation_types = [];
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

    get_filtered_calculation_types() {
        const normalized_query = this.search_query.trim().toLowerCase();

        if (!normalized_query) {
            return this.calculation_types;
        }

        return this.calculation_types.filter((calculation_type) =>
            calculation_type.title.toLowerCase().includes(normalized_query)
        );
    }

    getHTML() {
        const filtered_calculation_types = this.get_filtered_calculation_types();

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
                </div>

                <div id="calculation-type-list" class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4"></div>
                <div
                    id="calculation-type-empty-state"
                    class="calculation-type-empty${filtered_calculation_types.length ? " d-none" : ""}"
                >
                    По вашему запросу услуги не найдены.
                </div>
            </div>
        `;
    }

    click_card(calculation_type_data) {
        const calculation_type_page = new CalculationTypePage(this.parent, calculation_type_data.id, calculation_type_data);
        calculation_type_page.render();
    }

    handle_search(event) {
        this.search_query = event.target.value;
        this.update_calculation_type_list();
    }

    update_calculation_type_list() {
        const filtered_calculation_types = this.get_filtered_calculation_types();
        this.calculation_type_list_root.innerHTML = "";

        filtered_calculation_types.forEach((calculation_type_data) => {
            const calculation_type_card = new CalculationTypeCardComponent(this.calculation_type_list_root);
            calculation_type_card.render(calculation_type_data, this.click_card.bind(this));
        });

        this.counter_root.textContent = `Кол-во услуг: ${this.calculation_types.length}`;
        this.empty_state_root.classList.toggle("d-none", filtered_calculation_types.length > 0);
    }

    async render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());
        this.search_input.addEventListener("input", this.handle_search.bind(this));

        const { data, status } = await getCalculationTypes();
        this.calculation_types = status === 200 && Array.isArray(data) ? data : [];
        this.update_calculation_type_list();
    }
}
