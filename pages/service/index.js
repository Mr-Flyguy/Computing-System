import { ServiceDetailsComponent } from "../../components/service-details/index.js";
import { ServiceHeaderComponent } from "../../components/service-header/index.js";
import { MainPage } from "../main/index.js";
import { get_service_by_id } from "../../utils/service-storage.js";

export class ServicePage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = Number(id);
    }

    get page_root() {
        return document.getElementById("service-page");
    }

    getHTML() {
        return `
            <div id="service-page" class="app-container"></div>
        `;
    }

    click_home() {
        const main_page = new MainPage(this.parent);
        main_page.render();
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const service_header = new ServiceHeaderComponent(this.page_root);
        service_header.render("Лабораторная работа", this.click_home.bind(this));

        const service = get_service_by_id(this.id);

        if (!service) {
            this.page_root.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="service-page-card">
                        <h2 class="mb-2">Услуга не найдена</h2>
                        <p class="text-muted mb-0">Выберите услугу из каталога на главной странице.</p>
                    </div>
                `
            );
            return;
        }

        const service_details_component = new ServiceDetailsComponent(this.page_root);
        service_details_component.render(service);
    }
}
