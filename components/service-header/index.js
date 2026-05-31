export class ServiceHeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(title, listener) {
        this.parent.insertAdjacentHTML(
            "beforeend",
            `
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                    <div>
                        <p class="text-muted mb-1">Навигация по услуге</p>
                        <h2 class="mb-0">${title}</h2>
                    </div>

                    <button class="btn btn-outline-secondary pm-btn-outline" id="home-button">
                        Домой
                    </button>
                </div>
            `
        );

        document.getElementById("home-button").addEventListener("click", listener);
    }
}