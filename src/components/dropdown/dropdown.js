class DropdownOpenPart {
    constructor(openPart) {
        this.openPart = openPart;
        this.allStringsOpenPart = document.querySelectorAll('.dropdown-js__item-dropdown');
        this.assignHandler();
    }

    handleDropDownButtonsClick(oneString) {
        let submitButton = oneString.currentTarget;
        let action = '';
        if (submitButton.classList.contains('quantity__button-minus')) {
            action = 'subtraction';
        } else {
            action = 'addition';
        }
        if (action === 'addition') {
            let count = submitButton.previousElementSibling.getAttribute('value');
            if (count === '0') {
                submitButton.parentElement.firstElementChild.classList.toggle('dropdown-js__inviseble');
            };
            let newCount = ++count;
            submitButton.previousElementSibling.setAttribute('value', newCount);
        } else {
            let count = submitButton.nextElementSibling.getAttribute('value');
            let newCount = --count;
            if (newCount === 0) {
                submitButton.classList.toggle('dropdown-js__inviseble');
            };
            submitButton.nextElementSibling.setAttribute('value', newCount);
        };
    }

    assignHandler () {
        for (oneString of this.allStringsOpenPart) {
            let buttonsInThisString = oneString.querySelectorAll('.quantity__button');
            for (buttonInString of buttonsInThisString) {
                buttonInString.addEventListener('click', this.handleDropDownButtonsClick);
            }  
        }
    }
}

let quantity = document.querySelectorAll('.quantity');

for (elem of quantity) {
    if (elem.value === '0') {
        elem.previousElementSibling.classList.toggle('dropdown-js__inviseble');
    };
}
class Dropdown {
    constructor(elem) {
        this._elem = elem;
        elem.querySelector('.dropdown-button').onclick = this.openOrClose.bind(this);
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
        if (this._elem.querySelector('.dropdown-js__list-of-options')) {
            new DropdownOpenPart(elem.querySelector('.dropdown-js__list-of-options'));
        } else {
            alert(this._elem);
        };
    }
}

let allDropdowns = document.querySelectorAll('.dropdown-js');
for (dropdown of allDropdowns) {
    new Dropdown(dropdown);
}