import { ServiceDetailsComponent } from "../../components/service-details/index.js";
import { ServiceModelComponent } from "../../components/service-model/index.js";
import { ServiceHeaderComponent } from "../../components/service-header/index.js";
import { MainPage } from "../main/index.js";
import { getCalculationTypeById } from "../../modules/calculation-type-api.js";

export class ServicePage {
    constructor(parent, id, service_data = null) {
        this.parent = parent;
        this.id = Number(id);
        this.service_data = service_data;
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

    async render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const service_header = new ServiceHeaderComponent(this.page_root);
        service_header.render(this.click_home.bind(this));

        const service = this.service_data || await this.load_service();

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

        const model_root = document.getElementById("service-model-root");
        const service_model = new ServiceModelComponent(model_root);
        service_model.render();
    }

    async load_service() {
        const { data, status } = await getCalculationTypeById(this.id);

        if (status !== 200) {
            return null;
        }

        return data;
    }
}
