export class ServiceDetailsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    get_type_label(calculation_type) {
        if (calculation_type === "factorial") {
            return "Факториал";
        }

        if (calculation_type === "gcd") {
            return "НОД";
        }

        if (calculation_type === "solve_expression") {
            return "Вычисление выражения";
        }

        if (calculation_type === "sum_unique_elements") {
            return "Сумма уникальных элементов";
        }

        return "Сумма уникальных элементов";
    }

    getHTML(service_data) {
        return `
            <div class="service-page-card">
                <div class="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
                    <div>
                        <h2 class="mb-2">${service_data.title}</h2>
                        <p class="text-muted mb-0">${service_data.description}</p>
                    </div>
                    <span class="request-status">Услуга вычислений</span>
                </div>

                <div class="request-media">
                    <div class="request-image-block">
                        <img class="request-image" src="${service_data.image}" alt="Изображение услуги">
                    </div>
                </div>

                <div class="request-detail-grid">
                    <div class="request-detail-item">
                        <div class="request-detail-label">Тип</div>
                        <div class="request-detail-value">${this.get_type_label(service_data.calculation_type)}</div>
                    </div>
                    <div class="request-detail-item">
                        <div class="request-detail-label">Описание</div>
                        <div class="request-detail-value request-detail-value-text">
                            ${service_data.description}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(service_data) {
        const html = this.getHTML(service_data);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}
