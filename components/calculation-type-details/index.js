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

export class CalculationTypeDetailsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    get_type_label(calculation_type) {
        const labels = {
            factorial: "Факториал",
            gcd: "НОД",
            solve: "Вычисление выражения",
            solve_expression: "Вычисление выражения",
            sum_of_squares: "Сумма квадратов",
            sum_unique_elements: "Сумма уникальных элементов"
        };

        return labels[calculation_type] || "Услуга вычислений";
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
            <div class="calculation-type-page-card">
                <div class="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
                    <div>
                        <h2 class="mb-2">${escape_html(calculation_type_data.title)}</h2>
                        <p class="text-muted mb-0">${escape_html(calculation_type_data.description)}</p>
                    </div>
                    <span class="calculation-type-status">Услуга вычислений</span>
                </div>

                <div class="calculation-type-media">
                    <div class="calculation-type-image-block">
                        <img class="calculation-type-image" src="${image}" alt="Изображение услуги">
                    </div>
                </div>

                <div class="calculation-type-detail-grid mb-3">
                    <div class="calculation-type-detail-item">
                        <div class="calculation-type-detail-label">Тип</div>
                        <div class="calculation-type-detail-value">${this.get_type_label(calculation_type_data.calculation_type)}</div>
                    </div>
                </div>

                <div class="calculation-type-extra-item">
                    <span class="calculation-type-extra-key">Описание</span>
                    <span class="calculation-type-extra-value calculation-type-extra-value-left">
                        ${escape_html(calculation_type_data.description)}
                    </span>
                </div>
            </div>
        `;
    }

    render(calculation_type_data) {
        const html = this.getHTML(calculation_type_data);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}
