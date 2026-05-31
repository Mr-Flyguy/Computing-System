import { CalculationTypeDetailsComponent } from "../../components/calculation-type-details/index.js";
import { CalculationTypeModelComponent } from "../../components/calculation-type-model/index.js";
import { CalculationTypeHeaderComponent } from "../../components/calculation-type-header/index.js";
import { MainPage } from "../main/index.js";
import { get_calculation_type_by_id } from "../../utils/calculation-type-storage.js";

export class CalculationTypePage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = Number(id);
    }

    get page_root() {
        return document.getElementById("calculation-type-page");
    }

    getHTML() {
        return `
            <div id="calculation-type-page" class="app-container"></div>
        `;
    }

    click_back() {
        const main_page = new MainPage(this.parent);
        main_page.render();
    }

    click_home() {
        const main_page = new MainPage(this.parent);
        main_page.render();
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const calculation_type_header = new CalculationTypeHeaderComponent(this.page_root);
        calculation_type_header.render(this.click_home.bind(this));

        const calculation_type = get_calculation_type_by_id(this.id);

        if (!calculation_type) {
            this.page_root.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="calculation-type-page-card">
                        <h2 class="mb-2">Услуга не найдена</h2>
                        <p class="text-muted mb-0">Выберите услугу из каталога на главной странице.</p>
                    </div>
                `
            );
            return;
        }

        const calculation_type_details_component = new CalculationTypeDetailsComponent(this.page_root);
        calculation_type_details_component.render(calculation_type);

        const calculation_type_model_root = document.getElementById("calculation-type-model-root");
        const calculation_type_model = new CalculationTypeModelComponent(calculation_type_model_root);
        calculation_type_model.render();
    }
}
