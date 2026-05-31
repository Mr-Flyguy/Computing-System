export class ServiceHeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(listener) {
        this.parent.insertAdjacentHTML(
            "beforeend",
            `
                <div class="d-flex justify-content-end mb-3">
                    <button class="btn btn-outline-secondary pm-btn-outline" id="home-button">Домой</button>
                </div>
            `
        );

        document.getElementById("home-button").addEventListener("click", listener);
    }
}
