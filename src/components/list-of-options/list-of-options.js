import '../dropdown/dropdown.js';

class DropdownOpenPart {
    constructor(openPart) {
        this.openPart = openPart;
        this.allStringsOpenPart = this.openPart.querySelectorAll('.js-list-of-options__item');
        this.assignHandler();
    }

    updatePlaceholder(parent) {
        let placeholder = parent.currentTarget.closest('.js-dropdown').querySelector('.dropdown__text-placeholder');
        return placeholder
    }

    handleDropDownButtonsClick(oneString) {
        let submitButton = oneString.currentTarget;
        let action = '';
        let newCount = 0
        if (submitButton.classList.contains('js-quantity__button-minus')) {
            action = 'subtraction';
        } else {
            action = 'addition';
        }
        if (action === 'addition') {
            let count = submitButton.previousElementSibling.getAttribute('value');
            if (count === '0') {
                submitButton.parentElement.firstElementChild.classList.toggle('js-dropdown__invisible');
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
                submitButton.classList.toggle('js-dropdown__invisible');
            };
            submitButton.nextElementSibling.setAttribute('value', newCount);
        };
    }

    assignHandler () {
        for (let oneString of this.allStringsOpenPart) {
            let buttonsInThisString = oneString.querySelectorAll('.js-quantity__button');
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
        let allStringsOpenPart = placeholder.closest('.js-dropdown').querySelectorAll('.js-list-of-options__item')
        
        let countBedroom = 0;
        let countBed = 0;
        let countBathroom = 0;

        let spellingOptionsBedroom = [' ??????????????', ' ??????????????', ' ????????????'];
        let spellingOptionsBed = [' ??????????????', ' ??????????????', ' ????????????????'];
        let spellingOptionsBathroom = [' ???????????? ??????????????', ' ???????????? ??????????????', ' ???????????? ????????????'];

        for (let elem of allStringsOpenPart) {
            if (elem.querySelector('p').innerHTML === '??????????????') {
                countBedroom = elem.querySelector('.js-quantity__input').getAttribute('value');
            };
            if (elem.querySelector('p').innerHTML === '??????????????') {
                countBed = elem.querySelector('.js-quantity__input').getAttribute('value');
            };
            if (elem.querySelector('p').innerHTML === '???????????? ??????????????') {
                countBathroom = elem.querySelector('.js-quantity__input').getAttribute('value');
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
        this.invisibleCancel();      
    }

    invisibleCancel() {
        let buttonClear = this.openPart.querySelector('.js-list-of-options__bottom-button .js-list-of-options__button_clear');
        let allStringsQuantity = this.openPart.querySelectorAll('.js-quantity__input');
        let summQuantity = 0;
        for (let string of allStringsQuantity) {
            summQuantity = summQuantity + Number(string.getAttribute('value'));
        }
        if ((summQuantity === 0) && (!(buttonClear === null))) {
            buttonClear.classList.add('js-dropdown__invisible');
        }
    }

    updatePlaceholder() {
        let errorNone = 'Default value';
    }

    handleDropDownButtonsClick(oneString) {
        super.handleDropDownButtonsClick(oneString);
        let buttonClear = oneString.currentTarget.closest('.js-dropdown').querySelector('.js-list-of-options__bottom-button .js-list-of-options__button_clear');
        
        if (!(buttonClear === null)) {
            buttonClear.classList.remove('js-dropdown__invisible');
        }
        
        let allStringsQuantity = oneString.currentTarget.closest('.js-dropdown').querySelectorAll('.js-list-of-options_with-buttons .js-quantity__input');
        let summQuantity = 0;
        for (let string of allStringsQuantity) {
            summQuantity = summQuantity + Number(string.getAttribute('value'));
        }
        if ((summQuantity === 0) && (!(buttonClear === null))) {
            buttonClear.classList.add('js-dropdown__invisible');
        }
    }

    buttonHandlingClear(parent) {
        let placeholder = parent.currentTarget.closest('.js-dropdown').querySelector('.js-dropdown__text-placeholder'),
            inputQuantity = parent.currentTarget.closest('.js-dropdown').querySelectorAll('.js-quantity__input'),
            buttonClear = parent.currentTarget.closest('.js-list-of-options__button_clear'),
            standardPlaceholder = '?????????????? ????????????';
            
        placeholder.innerHTML = standardPlaceholder;

        for (let elem of inputQuantity) {
            elem.setAttribute('value', 0);
            if (!(elem.previousSibling.classList.contains('js-dropdown__invisible'))) {
                elem.previousSibling.classList.toggle('js-dropdown__invisible');
            }
        }
        buttonClear.classList.add('js-dropdown__invisible');
    }

    buttonHandlingApply(parent) {
        let placeholder = parent.currentTarget.closest('.js-dropdown').querySelector('.js-dropdown__text-placeholder'),
            inputQuantity= parent.currentTarget.closest('.js-dropdown').querySelectorAll('.js-quantity__input'),
            numberOfVisitors = 0,
            numberOfAdults = 0,
            numberOfBaby = 0,
            addBaby = '',
            spellingOptionsVisitors = [' ??????????', ' ??????????', ' ????????????'],
            spellingOptionsBaby = [' ????????????????', ' ????????????????', ' ??????????????????'];

        numberOfVisitors = Number(inputQuantity[0].getAttribute('value')) + Number(inputQuantity[1].getAttribute('value'));
        numberOfBaby = Number(inputQuantity[2].getAttribute('value'));
        numberOfAdults = Number(inputQuantity[0].getAttribute('value'));

        let newPlaceholder = ((numberOfVisitors > 0) && (numberOfVisitors < 2)) ? spellingOptionsVisitors[0]:
        ((numberOfVisitors > 1) && (numberOfVisitors < 5)) ? spellingOptionsVisitors[1]:
        spellingOptionsVisitors[2];

        if (numberOfBaby > 0 ) {
            addBaby = ((numberOfBaby > 0) && (numberOfBaby < 2)) ? spellingOptionsBaby[0]:
            ((numberOfBaby > 1) && (numberOfBaby < 5)) ? spellingOptionsBaby[1]:
            spellingOptionsBaby[2];
        }

        if ((numberOfAdults !== 0) && (numberOfBaby === 0)) {
            placeholder.innerHTML = numberOfVisitors + newPlaceholder;
        } else if ((numberOfAdults !== 0) && (numberOfBaby !== 0)){
            placeholder.innerHTML = numberOfVisitors + newPlaceholder + ', ' + numberOfBaby + addBaby;
        }
    }

    assignHandler() {
        super.assignHandler();
        let buttonClear = this.openPart.querySelector('.js-list-of-options__button_clear'),
            buttonApply = this.openPart.querySelector('.js-list-of-options__button_apply');
        buttonClear.addEventListener('click', this.buttonHandlingClear);
        buttonApply.addEventListener('click', this.buttonHandlingApply);
    }

}

let quantity = document.querySelectorAll('.js-quantity__input');

for (let elem of quantity) {
    if (elem.value === '0') {
        elem.previousElementSibling.classList.toggle('js-dropdown__invisible');
    };
}

if (document.querySelector('.js-list-of-options_with-buttons')) {
    let classDropdownBlock = document.querySelectorAll('.js-list-of-options_with-buttons');
    for (let elem of classDropdownBlock) {
        new DropdownWithButton(elem);
    }
};
if (document.querySelector('.js-list-of-options')) {
    let classDropdownBlock = document.querySelectorAll('.js-list-of-options');
    for (let elem of classDropdownBlock) {
        new DropdownDefault(elem);
    }
}