export class CalculationTypeDetailsComponent {
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

        return "Сумма квадратов";
    }

    getHTML(calculation_type_data) {
        return `
            <div class="calculation-type-page-card">
                <div class="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
                    <div>
                        <h2 class="mb-2">${calculation_type_data.title}</h2>
                        <p class="text-muted mb-0">${calculation_type_data.description}</p>
                    </div>
                    <span class="calculation-type-status">Услуга вычислений</span>
                </div>

                <div class="calculation-type-media">
                    <div class="calculation-type-image-block">
                        <img class="calculation-type-image" src="${calculation_type_data.image}" alt="Изображение услуги">
                    </div>
                </div>

                <div class="calculation-type-detail-grid">
                    <div class="calculation-type-detail-item">
                        <div class="calculation-type-detail-label">Тип</div>
                        <div class="calculation-type-detail-value">${this.get_type_label(calculation_type_data.calculation_type)}</div>
                    </div>
                    <div class="calculation-type-detail-item">
                        <div class="calculation-type-detail-label">Описание</div>
                        <div class="calculation-type-detail-value calculation-type-detail-value-text">
                            ${calculation_type_data.description}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(calculation_type_data) {
        const html = this.getHTML(calculation_type_data);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}
