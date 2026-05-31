(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const o of c.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(n){if(n.ep)return;n.ep=!0;const c=e(n);fetch(n.href,c)}})();class r{constructor(t){this.parent=t}getHTML(t,e,a="btn btn-danger pm-btn w-100"){return`
            <button class="${a}" id="${e}">
                ${t}
            </button>
        `}render(t,e,a,n){this.parent.insertAdjacentHTML("beforeend",this.getHTML(t,e,n)),document.getElementById(e).addEventListener("click",a)}}class u{constructor(t){this.parent=t}get_type_label(t){return t.calculation_type==="factorial"?"Комбинаторика":t.calculation_type==="gcd"?"Целые числа":t.calculation_type==="solve_expression"?"Алгебра":"Массивы"}getHTML(t){return`
            <div class="col">
                <div class="card calculation-type-card">
                    <img
                        class="calculation-type-card-image"
                        src="${t.image}"
                        alt="Изображение услуги ${t.title}"
                    >

                    <div class="card-body d-flex flex-column">
                        <div class="mb-2">
                            <span class="calculation-type-status">${this.get_type_label(t)}</span>
                        </div>

                        <h5 class="calculation-type-title">${t.title}</h5>
                        <p class="calculation-type-text">${t.description}</p>

                        <div class="mt-auto">
                            <div id="calculation-type-delete-button-${t.id}" class="w-100 mb-2"></div>
                            <div id="calculation-type-open-button-${t.id}" class="w-100"></div>
                        </div>
                    </div>
                </div>
            </div>
        `}render(t,e,a){const n=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",n);const c=document.getElementById(`calculation-type-delete-button-${t.id}`),o=document.getElementById(`calculation-type-open-button-${t.id}`);new r(c).render("Удалить услугу",`calculation-type-delete-${t.id}`,a,"btn btn-outline-danger pm-btn-outline-danger w-100"),new r(o).render("Открыть услугу",`calculation-type-open-${t.id}`,e,"btn btn-danger pm-btn w-100"),document.getElementById(`calculation-type-delete-${t.id}`).dataset.id=t.id,document.getElementById(`calculation-type-open-${t.id}`).dataset.id=t.id}}class p{constructor(t){this.parent=t}get_type_label(t){return t==="factorial"?"Факториал":t==="gcd"?"НОД":t==="solve_expression"?"Вычисление выражения":"Сумма квадратов"}getHTML(t){return`
            <div class="calculation-type-page-card">
                <div class="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
                    <div>
                        <h2 class="mb-2">${t.title}</h2>
                        <p class="text-muted mb-0">${t.description}</p>
                    </div>
                    <span class="calculation-type-status">Услуга вычислений</span>
                </div>

                <div class="calculation-type-media">
                    <div class="calculation-type-image-block">
                        <img class="calculation-type-image" src="${t.image}" alt="Изображение услуги">
                    </div>
                </div>

                <div class="calculation-type-detail-grid">
                    <div class="calculation-type-detail-item">
                        <div class="calculation-type-detail-label">Тип</div>
                        <div class="calculation-type-detail-value">${this.get_type_label(t.calculation_type)}</div>
                    </div>
                    <div class="calculation-type-detail-item">
                        <div class="calculation-type-detail-label">Описание</div>
                        <div class="calculation-type-detail-value calculation-type-detail-value-text">
                            ${t.description}
                        </div>
                    </div>
                </div>
            </div>
        `}render(t){const e=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",e)}}class y{constructor(t){this.parent=t}render(t){this.parent.insertAdjacentHTML("beforeend",`
                <div class="d-flex justify-content-end mb-3">
                    <button class="btn btn-outline-secondary pm-btn-outline" id="home-button">Домой</button>
                </div>
            `),document.getElementById("home-button").addEventListener("click",t)}}const _=[{id:1,title:"Факториал",description:"Вычисление факториала числа n для задач дискретной математики и комбинаторики.",calculation_type:"factorial",image:"https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80"},{id:2,title:"НОД",description:"Поиск наибольшего общего делителя двух чисел с помощью алгоритма Евклида.",calculation_type:"gcd",image:"https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80"},{id:3,title:"Сумма квадратов",description:"Подсчёт суммы квадратов элементов массива чисел для последующего анализа данных.",calculation_type:"sum_of_squares",image:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80"},{id:4,title:"Вычисление выражения",description:"Подстановка значения x в выражение и вычисление результата по арифметическим правилам.",calculation_type:"solve_expression",image:"https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80"}],l=_.map(i=>({...i}));function s(){return l.map(i=>({...i}))}function m(i){return l.find(t=>t.id===i)}function h(){if(l.length===0)return null;const i=l[0],t=Math.max(...l.map(a=>a.id))+1,e={...i,id:t};return l.push(e),{...e}}function g(i){const t=l.findIndex(e=>e.id===i);return t===-1?!1:(l.splice(t,1),!0)}class b{constructor(t,e){this.parent=t,this.id=Number(e)}get page_root(){return document.getElementById("calculation-type-page")}getHTML(){return`
            <div id="calculation-type-page" class="app-container"></div>
        `}click_back(){new d(this.parent).render()}click_home(){new d(this.parent).render()}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),new y(this.page_root).render(this.click_home.bind(this));const e=m(this.id);if(!e){this.page_root.insertAdjacentHTML("beforeend",`
                    <div class="calculation-type-page-card">
                        <h2 class="mb-2">Услуга не найдена</h2>
                        <p class="text-muted mb-0">Выберите услугу из каталога на главной странице.</p>
                    </div>
                `);return}new p(this.page_root).render(e)}}class d{constructor(t){this.parent=t,this.search_query=""}get calculation_type_list_root(){return document.getElementById("calculation-type-list")}get search_input(){return document.getElementById("calculation-type-search-input")}get empty_state_root(){return document.getElementById("calculation-type-search-empty")}get counter_root(){return document.getElementById("calculation-type-counter")}get add_calculation_type_button_root(){return document.getElementById("add-calculation-type-button")}get_filtered_calculation_types(){const t=s(),e=this.search_query.trim().toLowerCase();return e?t.filter(a=>a.title.toLowerCase().includes(e)):t}getHTML(){const t=s(),e=this.get_filtered_calculation_types();return`
            <div id="main-page" class="app-container">
                <div class="hero-block">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h1 class="hero-title">Услуги вычислений</h1>
                            <p class="hero-text">
                                Каталог вычислительных услуг: факториал, НОД и сумма квадратов
                            </p>
                        </div>

                        <div class="calculation-type-counter-badge">
                            <span id="calculation-type-counter">Кол-во услуг: ${t.length}</span>
                        </div>
                    </div>

                    <div class="calculation-type-search-block">
                        <label class="calculation-type-search-label" for="calculation-type-search-input">Поиск по названию</label>
                        <input
                            id="calculation-type-search-input"
                            class="form-control calculation-type-search-input"
                            type="text"
                            placeholder="Например, сумма или факториал"
                            value="${this.search_query}"
                        >
                    </div>

                    <div class="mt-3">
                        <div id="add-calculation-type-button" class="d-inline-flex"></div>
                    </div>
                </div>

                <div id="calculation-type-list" class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4"></div>
                <div
                    id="calculation-type-search-empty"
                    class="calculation-type-empty${e.length?" d-none":""}"
                >
                    По вашему запросу услуги не найдены.
                </div>
            </div>
        `}click_card(t){const e=Number(t.target.dataset.id);new b(this.parent,e).render()}handle_search(t){this.search_query=t.target.value,this.update_calculation_type_list()}add_calculation_type(){h(),this.update_calculation_type_list()}delete_calculation_type(t){const e=Number(t.target.dataset.id);g(e),this.update_calculation_type_list()}update_calculation_type_list(){const t=s(),e=this.get_filtered_calculation_types();this.calculation_type_list_root.innerHTML="",e.forEach(a=>{new u(this.calculation_type_list_root).render(a,this.click_card.bind(this),this.delete_calculation_type.bind(this))}),this.counter_root.textContent=`Кол-во услуг: ${t.length}`,this.empty_state_root.classList.toggle("d-none",e.length>0)}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.search_input.addEventListener("input",this.handle_search.bind(this)),new r(this.add_calculation_type_button_root).render("Добавить услугу","add-calculation-type-action",this.add_calculation_type.bind(this),"btn btn-danger pm-btn"),this.update_calculation_type_list()}}const f=document.getElementById("root"),v=new d(f);v.render();
