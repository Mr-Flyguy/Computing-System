import { ServiceDetailsComponent } from "../../components/service-details/index.js";
import { ServiceModelComponent } from "../../components/service-model/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { ButtonComponent } from "../../components/button/index.js";
import { MainPage } from "../main/index.js";
import { RequestFormPage } from "../request-form/index.js";
import { ajax } from "../../modules/ajax.js";
import { requestUrls } from "../../modules/requestUrls.js";
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

    get request_type() {
        const service = get_service_by_id(this.id);

        if (!service) {
            return "";
        }

        if (service.calculation_type === "solve_expression") {
            return "solve";
        }

        return service.calculation_type;
    }

    click_back() {
        const main_page = new MainPage(this.parent);
        main_page.render();
    }

    click_create() {
        const request_form_page = new RequestFormPage(this.parent, this.id);
        request_form_page.render();
    }

    click_edit_request(event) {
        const request_id = Number(event.target.dataset.id);
        const request_form_page = new RequestFormPage(this.parent, this.id, request_id);
        request_form_page.render();
    }

    render_data(service_data, requests) {
        const service_details_component = new ServiceDetailsComponent(this.page_root);
        service_details_component.render(service_data, requests);

        const create_button = new ButtonComponent(document.getElementById("request-create-button"));
        create_button.render(
            "Добавить заявку",
            "request-create-action",
            this.click_create.bind(this),
            "btn btn-danger pm-btn"
        );

        requests.forEach((request_data) => {
            document
                .getElementById(`request-edit-${request_data.id}`)
                .addEventListener("click", this.click_edit_request.bind(this));
        });

        const model_root = document.getElementById("service-model-root");
        const service_model = new ServiceModelComponent(model_root);
        service_model.render();
    }

    get_data() {
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

        ajax.get(requestUrls.getRequests({ type: this.request_type }), (data, status) => {
            if (status === 200) {
                this.render_data(service, data);
                return;
            }

            this.page_root.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="service-page-card">
                        <h2 class="mb-2">Не удалось загрузить заявки</h2>
                        <p class="text-muted mb-0">
                            Проверьте backend API и настройки CORS Unblock.
                        </p>
                    </div>
                `
            );
        });
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const back_button = new BackButtonComponent(this.page_root);
        back_button.render(this.click_back.bind(this));

        this.get_data();
    }
}
