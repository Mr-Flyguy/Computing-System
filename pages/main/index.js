import { RequestCardComponent } from "../../components/request-card/index.js";
import { RequestPage } from "../request/index.js";
import { get_services } from "../../utils/service-storage.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get request_list_root() {
        return document.getElementById("request-list");
    }

    getHTML() {
        const services = get_services();

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
                </div>

                <div id="request-list" class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4"></div>
            </div>
        `;
    }

    click_card(event) {
        const service_id = event.target.dataset.id;
        const request_page = new RequestPage(this.parent, service_id);
        request_page.render();
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const services = get_services();

        services.forEach((service_data) => {
            const request_card = new RequestCardComponent(this.request_list_root);
            request_card.render(
                service_data,
                this.click_card.bind(this)
            );
        });
    }
}
