let quantity = document.querySelectorAll('.quantity');

for (elem of quantity) {
    if (elem.value === '0') {
        elem.previousElementSibling.classList.toggle('dropdown-js__inviseble');
    };
}

function dropdownFunction() {
    let arrowRight = document.querySelector('.dropdown-js__arrow_up');
    let arrowDown = document.querySelector('.dropdown-js__arrow_down');
    let list = document.querySelector('.dropdown-js__list-of-options');
    arrowRight.classList.toggle('dropdown-js__inviseble');
    arrowDown.classList.toggle('dropdown-js__inviseble');
    list.classList.toggle('dropdown-js__inviseble');      
};

dropdown.addEventListener("click", dropdownFunction);

function getDropdownButtons(element) {
    const dropDownButtonsList = [];
    const dropDownButtons = element.querySelectorAll('.quantity__button');
    dropDownButtonsList.push(...dropDownButtons);
    return dropDownButtonsList;
};

function handleDropDownButtonsClick() {
    let action = '';
    if (this.classList.contains('quantity__button-minus')) {
        action = 'subtraction';
    } else {
        action = 'addition';
    }
    if (action === 'addition') {
        let count = this.previousElementSibling.getAttribute('value');
        if (count === '0') {
            this.parentElement.firstElementChild.classList.toggle('dropdown-js__inviseble');
        };
        let newCount = ++count;
        this.previousElementSibling.setAttribute('value', newCount);
    } else {
        let count = this.nextElementSibling.getAttribute('value');
        let newCount = --count;
        if (newCount === 0) {
            this.classList.toggle('dropdown-js__inviseble');
        };
        this.nextElementSibling.setAttribute('value', newCount);
    };
};

function setupEventListners(elements) {
    for (el of elements) {
        el.addEventListener('click', handleDropDownButtonsClick);
    }
};

function dropdownButtonsHendler() {
    let dropdownButtonsList = getDropdownButtons(this);
    setupEventListners(dropdownButtonsList);
};

dropdownJs__listOfOptions.addEventListener("mouseenter", dropdownButtonsHendler);
