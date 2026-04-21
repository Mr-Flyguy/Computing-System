import { RequestCardComponent } from "../../components/request-card/index.js";
import { RequestPage } from "../request/index.js";
import { get_services } from "../../utils/service-storage.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.search_query = "";
    }

    get request_list_root() {
        return document.getElementById("request-list");
    }

    get search_input() {
        return document.getElementById("service-search-input");
    }

    get empty_state_root() {
        return document.getElementById("service-search-empty");
    }

    get_filtered_services() {
        const services = get_services();
        const normalized_query = this.search_query.trim().toLowerCase();

        if (!normalized_query) {
            return services;
        }

        return services.filter((service) =>
            service.title.toLowerCase().includes(normalized_query)
        );
    }

    getHTML() {
        const services = get_services();
        const filtered_services = this.get_filtered_services();

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

                        <div class="request-counter">
                            ${services.length} услуги
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

                <div id="request-list" class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4"></div>
                <div
                    id="service-search-empty"
                    class="request-history-empty${filtered_services.length ? " d-none" : ""}"
                >
                    По вашему запросу услуги не найдены.
                </div>
            </div>
        `;
    }

    click_card(event) {
        const service_id = event.target.dataset.id;
        const request_page = new RequestPage(this.parent, service_id);
        request_page.render();
    }

    handle_search(event) {
        this.search_query = event.target.value;
        this.update_service_list();
    }

    update_service_list() {
        const filtered_services = this.get_filtered_services();

        this.request_list_root.innerHTML = "";

        filtered_services.forEach((service_data) => {
            const request_card = new RequestCardComponent(this.request_list_root);
            request_card.render(
                service_data,
                this.click_card.bind(this)
            );
        });

        this.empty_state_root.classList.toggle("d-none", filtered_services.length > 0);
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());
        this.update_service_list();
        this.search_input.addEventListener("input", this.handle_search.bind(this));
    }
}
