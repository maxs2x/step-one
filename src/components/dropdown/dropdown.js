class Dropdown {
    constructor(elem) {
        this._elem = elem;
        elem.querySelector('.js-dropdown__button').onclick = this.openOrClose.bind(this);

    }

    openOrClose() {
        let arrowRight = this._elem.querySelector('.js-dropdown__arrow_up');
        let arrowDown = this._elem.querySelector('.js-dropdown__arrow_down');
        let hiddenBlock = this._elem.querySelector('.js-dropdown__hidden-block');
        let borderDropdown = this._elem.querySelector('.js-dropdown__button');
        let borderDropdownMod = 'border-for-dropdown_active';

        arrowRight.classList.toggle('js-dropdown__invisible');
        arrowDown.classList.toggle('js-dropdown__invisible');
        hiddenBlock.classList.toggle('js-dropdown__invisible');     
        borderDropdown.classList.toggle(borderDropdownMod);
    }
}

let allDropdowns = document.querySelectorAll('.js-dropdown');
for (let dropdown of allDropdowns) {
    new Dropdown(dropdown);
}
