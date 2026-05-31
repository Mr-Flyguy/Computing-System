import { ButtonComponent } from "../button/index.js";
import { factorial, gcd, solveExpression } from "../../utils/calculations.js";
import { isPalindrom, sumOfUniqueElements } from "../../utils/text-and-array-calculations.js";

export class ServiceCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    get_type_label(service_data) {
        if (service_data.calculation_type === "factorial") {
            return "Комбинаторика";
        }

        if (service_data.calculation_type === "gcd") {
            return "Целые числа";
        }

        if (service_data.calculation_type === "solve_expression") {
            return "Алгебра";
        }

        return "Массивы";
    }

    getExampleText(service_data) {
        const type = service_data.calculation_type;

        if (type === "factorial") {
            return `5! = ${factorial(5)}`;
        }

        if (type === "gcd") {
            return `НОД(24, 18) = ${gcd(24, 18)}`;
        }

        if (type === "sum_unique_elements") {
            return `[1,2,3,2,4] → ${sumOfUniqueElements("1,2,3,2,4")}`;
        }

        if (type === "solve_expression") {
            return `выражение 2*x+3 при x=2 → ${solveExpression("2*x+3", 2)}`;
        }

        return "";
    }

    getHTML(service_data) {
        const example = this.getExampleText(service_data);
        const palindromeStatus = isPalindrom(service_data.title) ? "да" : "нет";

        return `
            <div class="col">
                <div class="card request-card">
                    <img
                        class="request-card-image"
                        src="${service_data.image}"
                        alt="Изображение услуги ${service_data.title}"
                    >

                    <div class="card-body d-flex flex-column">
                        <div class="mb-2">
                            <span class="request-status">${this.get_type_label(service_data)}</span>
                        </div>

                        <h5 class="request-title">${service_data.title}</h5>
                        <p class="request-text">${service_data.description}</p>
                        <p class="request-text mb-1">Название-палиндром: ${palindromeStatus}</p>
                        ${example ? `<p class="request-example-label mb-0">Пример:</p><p class="request-example text-muted mb-2">${example}</p>` : ``}

                        <div class="mt-auto">
                            <div id="request-delete-button-${service_data.id}" class="w-100 mb-2"></div>
                            <div id="request-open-button-${service_data.id}" class="w-100"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(service_data, open_listener, delete_listener) {
        const html = this.getHTML(service_data);
        this.parent.insertAdjacentHTML("beforeend", html);

        const delete_button_root = document.getElementById(`request-delete-button-${service_data.id}`);
        const open_button_root = document.getElementById(`request-open-button-${service_data.id}`);

        const delete_button = new ButtonComponent(delete_button_root);
        delete_button.render(
            "Удалить услугу",
            `request-delete-${service_data.id}`,
            delete_listener,
            "btn btn-outline-danger pm-btn-outline-danger w-100"
        );

        const open_button = new ButtonComponent(open_button_root);
        open_button.render(
            "Открыть услугу",
            `request-open-${service_data.id}`,
            open_listener,
            "btn btn-danger pm-btn w-100"
        );

        document.getElementById(`request-delete-${service_data.id}`).dataset.id = service_data.id;
        document.getElementById(`request-open-${service_data.id}`).dataset.id = service_data.id;
    }
}
