import { CalculationTypeDetailsComponent } from "../../components/calculation-type-details/index.js";
import { CalculationTypeHeaderComponent } from "../../components/calculation-type-header/index.js";
import { MainPage } from "../main/index.js";
import { getCalculationTypeById } from "../../modules/calculation-type-api.js";

export class CalculationTypePage {
    constructor(parent, id, calculation_type_data = null) {
        this.parent = parent;
        this.id = Number(id);
        this.calculation_type_data = calculation_type_data;
    }

    get page_root() {
        return document.getElementById("calculation-type-page");
    }

    getHTML() {
        return `
            <div id="calculation-type-page" class="app-container"></div>
        `;
    }

    click_home() {
        const main_page = new MainPage(this.parent);
        main_page.render();
    }

    async render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const calculation_type_header = new CalculationTypeHeaderComponent(this.page_root);
        calculation_type_header.render(this.click_home.bind(this));

        const calculation_type = this.calculation_type_data || await this.load_calculation_type();

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
    }

    async load_calculation_type() {
        const { data, status } = await getCalculationTypeById(this.id);

        if (status !== 200) {
            return null;
        }

        return data;
    }
}
