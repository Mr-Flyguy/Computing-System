function escape_html(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

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

    get_detail_items(calculation_type_data) {
        const items = [
            ["ID", calculation_type_data.id],
            ["Тип", this.get_type_label(calculation_type_data.calculation_type)],
            ["Статус", calculation_type_data.status],
            ["Результат", calculation_type_data.result]
        ];

        return items
            .filter(([, value]) => value !== undefined && value !== null && value !== "")
            .map(([label, value]) => `
                <div class="calculation-type-detail-item">
                    <div class="calculation-type-detail-label">${label}</div>
                    <div class="calculation-type-detail-value">${escape_html(value)}</div>
                </div>
            `)
            .join("");
    }

    get_parameter_items(calculation_type_data) {
        const items = [
            ["n", calculation_type_data.n],
            ["Массив чисел", calculation_type_data.numbers],
            ["a", calculation_type_data.a],
            ["b", calculation_type_data.b],
            ["Выражение", calculation_type_data.expression],
            ["x", calculation_type_data.x]
        ];

        const html = items
            .filter(([, value]) => value !== undefined && value !== null && value !== "")
            .map(([label, value]) => `
                <div class="calculation-type-extra-item">
                    <span class="calculation-type-extra-key">${label}</span>
                    <span class="calculation-type-extra-value">${escape_html(value)}</span>
                </div>
            `)
            .join("");

        if (!html) {
            return "";
        }

        return `
            <h3 class="calculation-type-section-title">Параметры</h3>
            <div class="calculation-type-extra-grid">
                ${html}
            </div>
        `;
    }

    getHTML(calculation_type_data) {
        const image = calculation_type_data.image || "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80";

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

                <div class="calculation-type-detail-grid">
                    ${this.get_detail_items(calculation_type_data)}
                </div>

                <div class="calculation-type-extra-item mb-3">
                    <span class="calculation-type-extra-key">Описание</span>
                    <span class="calculation-type-extra-value calculation-type-extra-value-left">
                        ${escape_html(calculation_type_data.description)}
                    </span>
                </div>

                ${this.get_parameter_items(calculation_type_data)}
            </div>
        `;
    }

    render(calculation_type_data) {
        const html = this.getHTML(calculation_type_data);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}
