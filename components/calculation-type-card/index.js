import { ButtonComponent } from "../button/index.js";

export class CalculationTypeCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    get_type_label(calculation_type_data) {
        const labels = {
            factorial: "Комбинаторика",
            gcd: "Целые числа",
            solve: "Алгебра",
            solve_expression: "Алгебра",
            sum_of_squares: "Массивы",
            sum_unique_elements: "Массивы"
        };

        return labels[calculation_type_data.calculation_type] || "Вычисления";
    }

    getHTML(calculation_type_data) {
        const image = calculation_type_data.image || "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80";

        return `
            <div class="col">
                <div class="card calculation-type-card">
                    <img
                        class="calculation-type-card-image"
                        src="${image}"
                        alt="Изображение услуги ${calculation_type_data.title}"
                    >

                    <div class="card-body d-flex flex-column">
                        <div class="mb-2">
                            <span class="calculation-type-status">${this.get_type_label(calculation_type_data)}</span>
                        </div>

                        <h5 class="calculation-type-title">${calculation_type_data.title}</h5>
                        <p class="calculation-type-text">${calculation_type_data.description}</p>

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
