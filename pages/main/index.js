import { ServiceCardComponent } from "../../components/service-card/index.js";
import { ButtonComponent } from "../../components/button/index.js";
import { ServicePage } from "../service/index.js";
import {
    create_service_copy_from_first,
    get_services,
    remove_service_by_id
} from "../../utils/service-storage.js";

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

    get counter_root() {
        return document.getElementById("service-counter");
    }

    get add_service_button_root() {
        return document.getElementById("add-service-button");
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
                            <span id="service-counter">${services.length} услуги</span>
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

                    <div class="mt-3">
                        <div id="add-service-button" class="d-inline-flex"></div>
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
        const service_id = Number(event.target.dataset.id);
        const service_page = new ServicePage(this.parent, service_id);
        service_page.render();
    }

    handle_search(event) {
        this.search_query = event.target.value;
        this.update_service_list();
    }

    add_service() {
        create_service_copy_from_first();
        this.update_service_list();
    }

    delete_service(event) {
        const service_id = Number(event.target.dataset.id);
        remove_service_by_id(service_id);
        this.update_service_list();
    }

    update_service_list() {
        const services = get_services();
        const filtered_services = this.get_filtered_services();
        this.request_list_root.innerHTML = "";

        filtered_services.forEach((service_data) => {
            const service_card = new ServiceCardComponent(this.request_list_root);
            service_card.render(
                service_data,
                this.click_card.bind(this),
                this.delete_service.bind(this)
            );
        });

        this.counter_root.textContent = `${services.length} услуги`;
        this.empty_state_root.classList.toggle("d-none", filtered_services.length > 0);
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());
        this.search_input.addEventListener("input", this.handle_search.bind(this));

        const add_service_button = new ButtonComponent(this.add_service_button_root);
        add_service_button.render(
            "Добавить услугу",
            "add-service-action",
            this.add_service.bind(this),
            "btn btn-danger pm-btn"
        );

        this.update_service_list();
    }
}
