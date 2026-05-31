import { ButtonComponent } from "../button/index.js";

function escape_html(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

const TYPE_IMAGES = {
    factorial: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
    gcd: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
    sum_of_squares: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    solve: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80",
    solve_expression: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80",
    sum_unique_elements: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
};

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

    get_image(calculation_type_data) {
        if (calculation_type_data.image) {
            return calculation_type_data.image;
        }

        return TYPE_IMAGES[calculation_type_data.calculation_type] || TYPE_IMAGES.sum_of_squares;
    }

    getHTML(calculation_type_data) {
        const image = this.get_image(calculation_type_data);

        return `
            <div class="col">
                <div class="card calculation-type-card">
                    <img
                        class="calculation-type-card-image"
                        src="${image}"
                        alt="Изображение услуги ${escape_html(calculation_type_data.title)}"
                    >

                    <div class="card-body d-flex flex-column">
                        <div class="mb-2">
                            <span class="calculation-type-status">${this.get_type_label(calculation_type_data)}</span>
                        </div>

                        <h5 class="calculation-type-title">${escape_html(calculation_type_data.title)}</h5>
                        <p class="calculation-type-text">${escape_html(calculation_type_data.description)}</p>

                        <div class="calculation-type-card-actions mt-auto">
                            <div id="calculation_type-open-button-${calculation_type_data.id}" class="calculation-type-card-action"></div>
                            <div id="calculation_type-delete-button-${calculation_type_data.id}" class="calculation-type-card-action"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(calculation_type_data, open_listener, delete_listener) {
        const html = this.getHTML(calculation_type_data);
        this.parent.insertAdjacentHTML("beforeend", html);

        const open_button_root = document.getElementById(`calculation_type-open-button-${calculation_type_data.id}`);
        const delete_button_root = document.getElementById(`calculation_type-delete-button-${calculation_type_data.id}`);

        const open_button = new ButtonComponent(open_button_root);
        open_button.render(
            "Подробнее",
            `calculation_type-open-${calculation_type_data.id}`,
            open_listener,
            "btn btn-danger pm-btn w-100"
        );

        document.getElementById(`calculation_type-open-${calculation_type_data.id}`).dataset.id = calculation_type_data.id;

        const delete_button = new ButtonComponent(delete_button_root);
        delete_button.render(
            "Удалить",
            `calculation_type-delete-${calculation_type_data.id}`,
            delete_listener,
            "btn btn-outline-danger pm-btn-outline-danger w-100"
        );

        const delete_button_element = document.getElementById(`calculation_type-delete-${calculation_type_data.id}`);
        delete_button_element.dataset.ids = (calculation_type_data.source_ids || [calculation_type_data.id]).join(",");
    }
}
