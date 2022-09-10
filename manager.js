import { getAvaliableChef } from "./chef.js";
import { getOrder } from "./order.js";
import { wait } from "./util.js";

let managers = [];

const manaerContainerEl = document.getElementById("managerContainer");

export class Manager {
    #status = "대기";

    constructor(name) {
        this.name = name;

        const divEl = document.createElement("div");
        const nameEl = document.createElement("span");
        nameEl.textContent = this.name;
        nameEl.style.marginRight = "1rem";
        divEl.append(nameEl);

        const statusEl = document.createElement("span");
        statusEl.className = "managerStatus";
        statusEl.textContent = this.#status;
        divEl.append(statusEl);

        this.el = divEl;

        manaerContainerEl.append(this.el);
    }

    async startWork() {
        while (true) {
            await this.#work();
        }
    }

    async #work() {
        try {
            this.#changeStatus("주문 확인중");
            const order = getOrder();
            if (!order) {
                return;
            }

            this.#changeStatus("요리사 확인중");
            const chef = await getAvaliableChef(order);

            (async () => {
                order.startCook();
                const food = await chef.cook(order);
                order.complete();
            })();
        } finally {
            this.#changeStatus("대기");
            await wait(100);
        }
    }

    #changeStatus(status) {
        this.#status = status;
        this.el.getElementsByClassName("managerStatus")[0].textContent = this.#status;
    }
}

export function initManager() {
    managers.push(new Manager("열혈매니저"), new Manager("부매니저"));
    managers.forEach((manager) => manager.startWork());
}
