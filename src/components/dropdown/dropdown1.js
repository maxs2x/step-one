class DropdownOpenPart {
    constructor(openPart) {
        this.openPart = openPart;
        this.allStringsOpenPart = document.querySelectorAll('.dropdown-js__item-dropdown');
    }

    handleDropDownButtonsClick(oneString) {
        let action = '';
        if (oneString.classList.contains('quantity__button-minus')) {
            action = 'subtraction';
        } else {
            action = 'addition';
        }
        if (action === 'addition') {
            let count = oneString.previousElementSibling.getAttribute('value');
            if (count === '0') {
                oneString.parentElement.firstElementChild.classList.toggle('dropdown-js__inviseble');
            };
            let newCount = ++count;
            oneString.previousElementSibling.setAttribute('value', newCount);
        } else {
            let count = oneString.nextElementSibling.getAttribute('value');
            let newCount = --count;
            if (newCount === 0) {
                oneString.classList.toggle('dropdown-js__inviseble');
            };
            oneString.nextElementSibling.setAttribute('value', newCount);
        };
    }

    assignHandler () {
        for (oneString of this.allStringsOpenPart) {
            oneString.addEventListner('click', this.handleDropDownButtonsClick(oneString));
        }
    }
}

class Dropdown {
    constructor(elem) {
        this._elem = elem;
        elem.querySelector('.dropdown-button').onclick = this.dropdownFunction.bind(this);
        this.openPart();
    }

    openOrClose() {
        let arrowRight = this._elem.querySelector('.dropdown-js__arrow_up');
        let arrowDown = this._elem.querySelector('.dropdown-js__arrow_down');
        let list = this._elem.querySelector('.dropdown-js__list-of-options');
        arrowRight.classList.toggle('dropdown-js__inviseble');
        arrowDown.classList.toggle('dropdown-js__inviseble');
        list.classList.toggle('dropdown-js__inviseble');      
    }

    openPart () {
        alert('class')
        new DropdownOpenPart(elem.querySelector('.dropdown-js__list-of-options'));
    }
}

let allDropdowns = document.querySelectorAll('.dropdown-js');

for (dropdown of allDropdowns) {
    new Dropdown(dropdown);
}