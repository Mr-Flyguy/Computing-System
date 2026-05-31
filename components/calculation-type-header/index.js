export class CalculationTypeHeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(listener, is_current_page = false) {
        this.parent.insertAdjacentHTML(
            "afterbegin",
            `
                <header class="calculation-type-header">
                    <button
                        class="calculation-type-home-button"
                        id="calculation-type-home-button"
                        type="button"
                        ${is_current_page ? 'aria-current="page"' : ""}
                    >
                        Услуги вычислений
                    </button>
                </header>
            `
        );

        document.getElementById("calculation-type-home-button").addEventListener("click", listener);
    }
}
