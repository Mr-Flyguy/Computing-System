import { ButtonComponent } from "../button/index.js";
import { factorial, gcd, solveExpression } from "../../utils/calculations.js";
import { isPalindrom, sumOfUniqueElements } from "../../utils/text-and-array-calculations.js";

export class CalculationTypeCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    get_type_label(calculation_type_data) {
        if (calculation_type_data.calculation_type === "factorial") {
            return "Комбинаторика";
        }

        if (calculation_type_data.calculation_type === "gcd") {
            return "Целые числа";
        }

        if (calculation_type_data.calculation_type === "solve_expression") {
            return "Алгебра";
        }

        return "Массивы";
    }

    getExampleText(calculation_type_data) {
        const type = calculation_type_data.calculation_type;

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

    getHTML(calculation_type_data) {
        const example = this.getExampleText(calculation_type_data);
        const palindromeStatus = isPalindrom(calculation_type_data.title) ? "да" : "нет";

        return `
            <div class="col">
                <div class="card calculation-type-card">
                    <img
                        class="calculation-type-card-image"
                        src="${calculation_type_data.image}"
                        alt="Изображение услуги ${calculation_type_data.title}"
                    >

                    <div class="card-body d-flex flex-column">
                        <div class="mb-2">
                            <span class="calculation-type-status">${this.get_type_label(calculation_type_data)}</span>
                        </div>

                        <h5 class="calculation-type-title">${calculation_type_data.title}</h5>
                        <p class="calculation-type-text">${calculation_type_data.description}</p>
                        <p class="calculation-type-text mb-1">Название-палиндром: ${palindromeStatus}</p>
                        ${example ? `<p class="calculation-type-example-label mb-0">Пример:</p><p class="calculation-type-example text-muted mb-2">${example}</p>` : ``}

                        <div class="mt-auto">
                            <div id="calculation_type-open-button-${calculation_type_data.id}" class="w-100"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(calculation_type_data, open_listener) {
        const html = this.getHTML(calculation_type_data);
        this.parent.insertAdjacentHTML("beforeend", html);

        const open_button_root = document.getElementById(`calculation_type-open-button-${calculation_type_data.id}`);

        const open_button = new ButtonComponent(open_button_root);
        open_button.render(
            "Подробнее",
            `calculation_type-open-${calculation_type_data.id}`,
            open_listener,
            "btn btn-danger pm-btn w-100"
        );

        document.getElementById(`calculation_type-open-${calculation_type_data.id}`).dataset.id = calculation_type_data.id;
    }
}
