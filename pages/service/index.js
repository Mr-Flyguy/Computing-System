import { ServiceDetailsComponent } from "../../components/service-details/index.js";
import { ServiceModelComponent } from "../../components/service-model/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { service_request_form_html } from "../main/service-request-form.js";
import { get_service_by_id } from "../../utils/service-storage.js";
import { add_request, get_next_id, get_requests_by_calculation_type } from "../../utils/service-request-storage.js";
import { factorial, gcd, solveExpression, sumOfSquares } from "../../utils/calculations.js";

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

    get_data() {
        const service = get_service_by_id(this.id);

        if (!service) {
            return null;
        }

        return {
            service,
            requests: get_requests_by_calculation_type(service.calculation_type)
        };
    }

    click_back() {
        const main_page = new MainPage(this.parent);
        main_page.render();
    }

    get_result(calculation_type, form_data) {
        if (calculation_type === "factorial") {
            return factorial(form_data.n);
        }

        if (calculation_type === "gcd") {
            return gcd(form_data.a, form_data.b);
        }

        if (calculation_type === "solve_expression") {
            return solveExpression(form_data.expression, form_data.x);
        }

        return sumOfSquares(form_data.numbers);
    }

    get_form_data(calculation_type) {
        if (calculation_type === "factorial") {
            return {
                n: Number(document.getElementById("service-n").value)
            };
        }

        if (calculation_type === "gcd") {
            return {
                a: Number(document.getElementById("service-a").value),
                b: Number(document.getElementById("service-b").value)
            };
        }

        if (calculation_type === "solve_expression") {
            return {
                expression: document.getElementById("service-expression").value,
                x: Number(document.getElementById("service-x").value)
            };
        }

        return {
            numbers: document.getElementById("service-numbers").value
        };
    }

    submit_form(event) {
        event.preventDefault();

        const service = get_service_by_id(this.id);
        const form_data = this.get_form_data(service.calculation_type);

        const request = {
            id: get_next_id(),
            calculation_type: service.calculation_type,
            status: "Выполнено",
            ...form_data,
            result: this.get_result(service.calculation_type, form_data)
        };

        add_request(request);
        this.render();
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const back_button = new BackButtonComponent(this.page_root);
        back_button.render(this.click_back.bind(this));

        const page_data = this.get_data();

        if (!page_data) {
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
        service_details_component.render(
            page_data.service,
            page_data.requests,
            service_request_form_html(page_data.service)
        );

        document
            .getElementById("service-request-form")
            .addEventListener("submit", this.submit_form.bind(this));

        const model_root = document.getElementById("service-model-root");
        const service_model = new ServiceModelComponent(model_root);
        service_model.render();
    }
}
