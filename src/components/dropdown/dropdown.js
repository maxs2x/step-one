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

function changeQuantity(quantity, action) {
    let count = quantity.getAttribute('value');
    if (action === 'addition') {
        if (count === '0') {
            quantity.previousElementSibling.classList.toggle('dropdown-js__inviseble');
        };
        let newCount = ++count;
        quantity.setAttribute('value', newCount);
    } else {
        let newCount = --count;
        if (newCount === 0) {
            quantity.previousElementSibling.classList.toggle('dropdown-js__inviseble');
        };
        quantity.setAttribute('value', newCount);
    };
};
function additionHandler(){
    let quantity = this.previousElementSibling
    changeQuantity(quantity, 'addition')
};
function subtractionHandler() {
    let quantity = this.nextElementSibling
    changeQuantity(quantity, 'subtraction')
};
button_minus.addEventListener("click", subtractionHandler);
button_plus.addEventListener("click", additionHandler);