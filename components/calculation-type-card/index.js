import { ButtonComponent } from "../button/index.js";

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

    getHTML(calculation_type_data) {
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

                        <div class="mt-auto">
                            <div id="calculation-type-delete-button-${calculation_type_data.id}" class="w-100 mb-2"></div>
                            <div id="calculation-type-open-button-${calculation_type_data.id}" class="w-100"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(calculation_type_data, open_listener, delete_listener) {
        const html = this.getHTML(calculation_type_data);
        this.parent.insertAdjacentHTML("beforeend", html);

        const delete_button_root = document.getElementById(`calculation-type-delete-button-${calculation_type_data.id}`);
        const open_button_root = document.getElementById(`calculation-type-open-button-${calculation_type_data.id}`);

        const delete_button = new ButtonComponent(delete_button_root);
        delete_button.render(
            "Удалить услугу",
            `calculation-type-delete-${calculation_type_data.id}`,
            delete_listener,
            "btn btn-outline-danger pm-btn-outline-danger w-100"
        );

        const open_button = new ButtonComponent(open_button_root);
        open_button.render(
            "Подробнее",
            `calculation-type-open-${calculation_type_data.id}`,
            open_listener,
            "btn btn-danger pm-btn w-100"
        );

        document.getElementById(`calculation-type-delete-${calculation_type_data.id}`).dataset.id = calculation_type_data.id;
        document.getElementById(`calculation-type-open-${calculation_type_data.id}`).dataset.id = calculation_type_data.id;
    }
}
