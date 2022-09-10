let foods = [];

const foodContainerEl = document.getElementById("foodContainer");

export const menu = {
    KookBab: "국밥",
    Steak: "스테이크",
};

class Food {
    _createEl(name, time) {
        const divEl = document.createElement("div");
        const nameEl = document.createElement("span");
        nameEl.textContent = name;
        nameEl.style.marginRight = "1rem";
        divEl.append(nameEl);

        const timeEl = document.createElement("span");
        timeEl.className = "foodTime";
        timeEl.textContent = time;
        divEl.append(timeEl);

        this.el = divEl;

        foodContainerEl.append(this.el);
    }

    _spandTime() {
        const timer = setInterval(() => {
            this.time--;
            if (this.time <= 0) {
                clearInterval(timer);
                this._remove();
                return;
            }
            this._presentFoodTime();
        }, 1000);
    }

    _remove() {
        this.el.remove();
        foods = foods.filter((x) => x !== this);
    }

    _presentFoodTime() {
        this.el.getElementsByClassName("foodTime")[0].textContent = this.time;
    }
}

export class Steak extends Food {
    name = "스테이크";
    time = 10;

    constructor() {
        super();
        this._createEl(this.name, this.time);
        this._spandTime();
    }
}

export class KookBab extends Food {
    name = "국밥";
    time = 5;

    constructor() {
        super();
        this._createEl(this.name, this.time);
        this._spandTime();
    }
}

export function createFood(food) {
    let _food = null;
    switch (food) {
        case menu.KookBab: {
            _food = new KookBab();
            break;
        }
        case menu.Steak: {
            _food = new Steak();
            break;
        }
    }

    if (_food) {
        foods.push(_food);
    }
    return _food;
}
