let orders = [];
let orderNumber = 1;

const orderContainerEl = document.getElementById("orderContainer");

export function createOrder(food) {
    return new Order(food);
}

export class Order {
    #status = "대기";

    constructor(food) {
        this.name = `주문${orderNumber++}`;
        this.food = food;

        const divEl = document.createElement("div");
        const nameEl = document.createElement("span");
        nameEl.textContent = this.name;
        nameEl.style.marginRight = "1rem";
        divEl.append(nameEl);

        const foodEl = document.createElement("span");
        foodEl.textContent = this.food;
        foodEl.style.marginRight = "1rem";
        divEl.append(foodEl);

        const statusEl = document.createElement("span");
        statusEl.className = "orderStatus";
        statusEl.textContent = this.#status;
        divEl.append(statusEl);

        this.el = divEl;

        orderContainerEl.append(this.el);
        orders.push(this);
    }

    startCook() {
        this.#status = "요리중";
        this.#presentStatus();
    }

    complete() {
        this.el.remove();
        orders = orders.filter((x) => x !== this);
    }

    #presentStatus() {
        this.el.getElementsByClassName("orderStatus")[0].textContent = this.#status;
    }
}

export function getOrder() {
    return orders.shift();
}
