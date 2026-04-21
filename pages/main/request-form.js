function get_fields_html(calculation_type) {
    if (calculation_type === "factorial") {
        return `
            <div class="col-md-6">
                <label class="form-label">Число n</label>
                <input type="number" min="0" class="form-control" id="request-n" value="5" required>
            </div>
        `;
    }

    if (calculation_type === "gcd") {
        return `
            <div class="col-md-6">
                <label class="form-label">Число a</label>
                <input type="number" class="form-control" id="request-a" value="24" required>
            </div>
            <div class="col-md-6">
                <label class="form-label">Число b</label>
                <input type="number" class="form-control" id="request-b" value="18" required>
            </div>
        `;
    }

    if (calculation_type === "solve_expression") {
        return `
            <div class="col-md-8">
                <label class="form-label">Выражение</label>
                <input type="text" class="form-control" id="request-expression" value="2*x+5" required>
            </div>
            <div class="col-md-4">
                <label class="form-label">Значение x</label>
                <input type="number" class="form-control" id="request-x" value="3" required>
            </div>
        `;
    }

    return `
        <div class="col-12">
            <label class="form-label">Массив чисел через запятую</label>
            <input type="text" class="form-control" id="request-numbers" value="1, 2, 3, 4" required>
        </div>
    `;
}

export function requests_form_html(service) {
    return `
        <form id="request-form" class="request-form-block">
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                <div>
                    <h3 class="mb-1">Создать заявку</h3>
                    <p class="text-muted mb-0">Введите данные для услуги «${service.title}»</p>
                </div>
                <span class="request-status">Новая</span>
            </div>

            <div class="row g-3">
                ${get_fields_html(service.calculation_type)}

                <div class="col-12">
                    <button type="submit" class="btn btn-danger pm-btn">
                        Создать заявку
                    </button>
                </div>
            </div>
        </form>
    `;
}
