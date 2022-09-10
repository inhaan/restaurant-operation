import { createFood } from "./food.js";
import { wait } from "./util.js";

let chefs = [];
let requestQueue = [];

const chefContainerEl = document.getElementById("chefContainer");

export class Chef {
    #status = "대기";

    constructor(name, speed) {
        this.name = name;
        this.speed = speed * 1000;

        const divEl = document.createElement("div");
        const nameEl = document.createElement("span");
        nameEl.textContent = this.name;
        nameEl.style.marginRight = "1rem";
        divEl.append(nameEl);

        const statusEl = document.createElement("span");
        statusEl.className = "chefStatus";
        statusEl.textContent = this.#status;
        statusEl.style.marginRight = "1rem";
        divEl.append(statusEl);

        const orderEl = document.createElement("span");
        orderEl.className = "chefOrder";
        divEl.append(orderEl);

        this.el = divEl;

        chefContainerEl.append(this.el);
    }

    get canCook() {
        return this.#status === "대기";
    }

    async cook(order) {
        if (this.#status === "요리중") {
            return;
        }
        this.#changeStatus("요리중", order);
        await wait(this.speed);
        const food = createFood(order.food);

        this.#changeStatus("대기");
        return food;
    }

    readyCook(order) {
        this.#changeStatus("요리준비", order);
    }

    #changeStatus(status, order) {
        this.#status = status;
        this.el.getElementsByClassName("chefStatus")[0].textContent = this.#status;
        this.el.getElementsByClassName("chefOrder")[0].textContent = order?.name || "";
    }
}

export function initChef() {
    chefs.push(new Chef("장금이", 1), new Chef("백주부", 2));
}

export async function getAvaliableChef(order) {
    requestQueue.push(order);

    let chef;
    while (!(chef = chefs.find((chef) => chef.canCook)) || requestQueue[0] !== order) {
        await wait(100);
    }

    requestQueue.shift();
    chef.readyCook(order);
    return chef;
}
