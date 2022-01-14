import {Calendar, OneDay, RangeDays} from './_calendar/calendar.js';

class DropdownOpenPart {
    constructor(openPart) {
        this.openPart = openPart;
        this.allStringsOpenPart = this.openPart.querySelectorAll('.dropdown-js__item-dropdown');
        this.assignHandler();
    }

    updatePlaceholder(parent) {
        let placeholder = parent.currentTarget.closest('.dropdown-js').querySelector('.dropdown-button p');
        return placeholder
    }

    handleDropDownButtonsClick(oneString) {
        let submitButton = oneString.currentTarget;
        let action = '';
        let newCount = 0
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
            if (count < 11) {
                newCount = ++count;
            } else {
                newCount = count;
            };
            submitButton.previousElementSibling.setAttribute('value', newCount);        
        } else {
            let count = submitButton.nextElementSibling.getAttribute('value');
            newCount = --count;
            if (newCount === 0) {
                submitButton.classList.toggle('dropdown-js__inviseble');
            };
            submitButton.nextElementSibling.setAttribute('value', newCount);
        };
    }

    assignHandler () {
        for (let oneString of this.allStringsOpenPart) {
            let buttonsInThisString = oneString.querySelectorAll('.quantity__button');
            for (let buttonInString of buttonsInThisString) {
                buttonInString.addEventListener('click', this.handleDropDownButtonsClick);
                buttonInString.addEventListener('click', this.updatePlaceholder);
            }  
        }
    }
}

class DropdownDefault extends DropdownOpenPart {
    constructor(openPart) {
        super(openPart);
    }

    updatePlaceholder(parent) {
        let placeholder = super.updatePlaceholder(parent);
        let allStringsOpenPart = placeholder.closest('.dropdown-js').querySelectorAll('.dropdown-js__item-dropdown')
        
        let countBedroom = 0;
        let countBed = 0;
        let countBathroom = 0;

        let spellingOptionsBedroom = [' спальня', ' спальни', ' спален'];
        let spellingOptionsBed = [' кровать', ' кровати', ' кроватей'];
        let spellingOptionsBathroom = [' ванная комната', ' ванные комнаты', ' ванных комнат'];

        for (let elem of allStringsOpenPart) {
            if (elem.querySelector('p').innerHTML === 'спальни') {
                countBedroom = elem.querySelector('.quantity').getAttribute('value');
            };
            if (elem.querySelector('p').innerHTML === 'кровати') {
                countBed = elem.querySelector('.quantity').getAttribute('value');
            };
            if (elem.querySelector('p').innerHTML === 'ванные комнаты') {
                countBathroom = elem.querySelector('.quantity').getAttribute('value');
            };
        }
        
        let textBedroom = ((countBedroom > 0) && (countBedroom < 2)) ? spellingOptionsBedroom[0]:
            ((countBedroom > 1) && (countBedroom < 5)) ? spellingOptionsBedroom[1]:
            spellingOptionsBedroom[2];
        let textBed = ((countBed > 0) && (countBed < 2)) ? spellingOptionsBed[0]:
            ((countBed > 1) && (countBed < 5)) ? spellingOptionsBed[1]:
            spellingOptionsBed[2];
        let textBathroom = ((countBathroom > 0) && (countBathroom < 2)) ? spellingOptionsBathroom[0]:
            ((countBathroom > 1) && (countBathroom < 5)) ? spellingOptionsBathroom[1]:
            spellingOptionsBathroom[2];

        let newPlaceholder = String(countBedroom) + textBedroom + ', ' + String(countBed) + textBed + ', ' + String(countBathroom) + textBathroom;
        
        let widthPlaceholder = placeholder.offsetWidth;
        if ((widthPlaceholder < 360) && (widthPlaceholder > 225)) {
            newPlaceholder = newPlaceholder.substr(0, (newPlaceholder.length - 17)) + ' ...';
        } else if (widthPlaceholder < 226) {
            newPlaceholder = newPlaceholder.substr(0, (newPlaceholder.length - 28)) + ' ...';
        }
        
        placeholder.innerHTML = newPlaceholder;
    }
}

class DropdownWithButton extends DropdownDefault {
    constructor(openPart) {
        super(openPart);  
        this.inviseCancel();      
    }

    inviseCancel() {
        let buttonClear = this.openPart.querySelector('.dropdown-js__bottom-button .dropdown-js__button_clear');
        let allStringsQuantity = this.openPart.querySelectorAll('input.quantity');
        let summQuantity = 0;
        for (let string of allStringsQuantity) {
            summQuantity = summQuantity + Number(string.getAttribute('value'));
        }
        if ((summQuantity === 0) && (!(buttonClear === null))) {
            buttonClear.classList.add('dropdown-js__inviseble');
        }
    }

    updatePlaceholder() {
        let errorNone = 'PUSTO';
    }

    handleDropDownButtonsClick(oneString) {
        super.handleDropDownButtonsClick(oneString);
        let buttonClear = oneString.currentTarget.closest('.dropdown-js').querySelector('.dropdown-js__bottom-button .dropdown-js__button_clear');
        
        if (!(buttonClear === null)) {
            buttonClear.classList.remove('dropdown-js__inviseble');
        }
        
        let allStringsQuantity = oneString.currentTarget.closest('.dropdown-js').querySelectorAll('.dropdown-js__list-of-options input.quantity');
        let summQuantity = 0;
        for (let string of allStringsQuantity) {
            summQuantity = summQuantity + Number(string.getAttribute('value'));
        }
        if ((summQuantity === 0) && (!(buttonClear === null))) {
            buttonClear.classList.add('dropdown-js__inviseble');
        }
    }

    buttonHendlingClear(parent) {
        let placeholder = parent.currentTarget.closest('.dropdown-js').querySelector('.dropdown-button p'),
            inputQuantity = parent.currentTarget.closest('.dropdown-js').querySelectorAll('input.quantity'),
            buttonClear = parent.currentTarget.closest('.button-dropdown'),
            standartPlaceholder = 'Сколько гостей';
            
        placeholder.innerHTML = standartPlaceholder;

        for (let elem of inputQuantity) {
            elem.setAttribute('value', 0);
            if (!(elem.previousSibling.classList.contains('dropdown-js__inviseble'))) {
                elem.previousSibling.classList.toggle('dropdown-js__inviseble');
            }
        }
        buttonClear.classList.add('dropdown-js__inviseble');
    }

    buttonHendlingApply(parent) {
        let placeholder = parent.currentTarget.closest('.dropdown-js').querySelector('.dropdown-button p');
        let inputQuantity= parent.currentTarget.closest('.dropdown-js').querySelectorAll('input.quantity');
    
        let numberOfVisitors = 0
        let spellingOptionsVisitors = [' гость', ' гостя', ' гостей']
        for (let elem of inputQuantity) {
            numberOfVisitors = numberOfVisitors + Number(elem.getAttribute('value'));
        }

        let newPlaceholder = ((numberOfVisitors > 0) && (numberOfVisitors < 2)) ? spellingOptionsVisitors[0]:
        ((numberOfVisitors > 1) && (numberOfVisitors < 5)) ? spellingOptionsVisitors[1]:
        spellingOptionsVisitors[2];

        if (numberOfVisitors !== 0) {
            placeholder.innerHTML = numberOfVisitors + newPlaceholder;
        }
        
    }

    assignHandler() {
        super.assignHandler();
        let buttonClear = this.openPart.querySelectorAll('.dropdown-js__bottom-button .button-dropdown')[0],
            buttonApply = this.openPart.querySelectorAll('.dropdown-js__bottom-button .button-dropdown')[1];
        buttonClear.addEventListener('click', this.buttonHendlingClear);
        buttonApply.addEventListener('click', this.buttonHendlingApply);
    }

}

let quantity = document.querySelectorAll('.quantity');

for (let elem of quantity) {
    if (elem.value === '0') {
        elem.previousElementSibling.classList.toggle('dropdown-js__inviseble');
    };
}
class Dropdown {
    constructor(elem) {
        this._elem = elem;
        this.dropdownDefault = this._elem.classList.contains('dropdown-js_default');
        elem.querySelector('.dropdown-button').onclick = this.openOrClose.bind(this);
        this.invisibleBlock = this.findInvisibleBlock();
        this.openPart();
    }

    findInvisibleBlock() {
        let classInvisibleBlock = ''
        if (this._elem.querySelector('.dropdown-js__list-of-options')) {
            classInvisibleBlock = '.dropdown-js__list-of-options';
        } else if (this._elem.querySelector('.dropdown-js__month-calendar')) {
            classInvisibleBlock = '.dropdown-js__month-calendar';
        }
        return classInvisibleBlock;
    }

    openOrClose() {
        let arrowRight = this._elem.querySelector('.dropdown-js__arrow_up');
        let arrowDown = this._elem.querySelector('.dropdown-js__arrow_down');
        let listOfOptions = this._elem.querySelector(this.invisibleBlock);
        let borderDropdown = this._elem.querySelector('.dropdown-button');
        let borderDropdownMod = 'border-for-dropdown_active';

        arrowRight.classList.toggle('dropdown-js__inviseble');
        arrowDown.classList.toggle('dropdown-js__inviseble');
        listOfOptions.classList.toggle('dropdown-js__inviseble');     
        borderDropdown.classList.toggle(borderDropdownMod);
        this.openPart();
    }

    openPart () {
        if (this._elem.querySelector('.dropdown-js__list-of-options')) {
            if (this.dropdownDefault) {
                new DropdownDefault(this._elem.querySelector(this.invisibleBlock));
            } else
                new DropdownWithButton(this._elem.querySelector(this.invisibleBlock));
        } else {
            new Calendar(this._elem.querySelector(this.invisibleBlock));
        };
    }
}

let allDropdowns = document.querySelectorAll('.dropdown-js');
for (let dropdown of allDropdowns) {
    new Dropdown(dropdown);
}
