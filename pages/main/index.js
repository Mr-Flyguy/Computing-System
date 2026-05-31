import { ServiceCardComponent } from "../../components/service-card/index.js";
import { ServicePage } from "../service/index.js";
import { getCalculationTypes } from "../../modules/calculation-type-api.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.search_query = "";
        this.services = [];
    }

    get service_list_root() {
        return document.getElementById("service-list");
    }

    get search_input() {
        return document.getElementById("service-search-input");
    }

    get empty_state_root() {
        return document.getElementById("service-empty-state");
    }

    get counter_root() {
        return document.getElementById("service-counter");
    }

    get_filtered_services() {
        const normalized_query = this.search_query.trim().toLowerCase();

        if (!normalized_query) {
            return this.services;
        }

        return this.services.filter((service) =>
            service.title.toLowerCase().includes(normalized_query)
        );
    }

    getHTML() {
        const filtered_services = this.get_filtered_services();

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

                        <div class="request-counter">
                            <span id="service-counter">Кол-во услуг: ${this.services.length}</span>
                        </div>
                    </div>

                    <div class="service-search-block">
                        <label class="service-search-label" for="service-search-input">Поиск по названию</label>
                        <input
                            id="service-search-input"
                            class="form-control service-search-input"
                            type="text"
                            placeholder="Например, сумма или факториал"
                            value="${this.search_query}"
                        >
                    </div>

                </div>

                <div id="service-list" class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4"></div>
                <div
                    id="service-empty-state"
                    class="request-history-empty${filtered_services.length ? " d-none" : ""}"
                >
                    По вашему запросу услуги не найдены.
                </div>
            </div>
        `;
    }

    click_card(service_data) {
        const service_page = new ServicePage(this.parent, service_data.id, service_data);
        service_page.render();
    }

    handle_search(event) {
        this.search_query = event.target.value;
        this.update_service_list();
    }

    update_service_list() {
        const filtered_services = this.get_filtered_services();
        this.service_list_root.innerHTML = "";

        filtered_services.forEach((service_data) => {
            const service_card = new ServiceCardComponent(this.service_list_root);
            service_card.render(service_data, this.click_card.bind(this));
        });

        this.counter_root.textContent = `Кол-во услуг: ${this.services.length}`;
        this.empty_state_root.classList.toggle("d-none", filtered_services.length > 0);
    }

    async render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());
        this.search_input.addEventListener("input", this.handle_search.bind(this));
        const { data, status } = await getCalculationTypes();
        this.services = status === 200 && Array.isArray(data) ? data : [];
        this.update_service_list();
    }
}
