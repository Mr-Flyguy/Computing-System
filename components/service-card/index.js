import { ButtonComponent } from "../button/index.js";

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

    getHTML(service_data) {
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
            `request-button-${service_data.id}`,
            open_listener,
            "btn btn-danger pm-btn w-100"
        );

        document.getElementById(`request-delete-${service_data.id}`).dataset.id = service_data.id;
        document.getElementById(`request-button-${service_data.id}`).dataset.id = service_data.id;
    }
}
