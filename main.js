import { initChef } from "./chef.js";
import { menu } from "./food.js";
import { initManager } from "./manager.js";
import { createOrder } from "./order.js";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnOrderKookBab").onclick = onClickBtnOrder.bind(null, menu.KookBab);
    document.getElementById("btnOrderSteak").onclick = onClickBtnOrder.bind(null, menu.Steak);

    initChef();
    initManager();
});

function onClickBtnOrder(food) {
    createOrder(food);
}
