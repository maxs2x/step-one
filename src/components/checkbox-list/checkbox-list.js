class AllCheckboxList {
    constructor(elem) {
        this._elem = elem;
        elem.querySelector('.js-checkbox-list__dropdown-button').onclick = this.openOrClose.bind(this);
  
    }

    openOrClose() {
        let arrowRight = this._elem.querySelector('.js-checkbox-list__arrow_up');
        let arrowDown = this._elem.querySelector('.js-checkbox-list__arrow_down');
        let listOfOptions = this._elem.querySelector('.js-checkbox-list__elements');
        console.log('openorclose');
        console.log(arrowDown, listOfOptions);

        arrowRight.classList.toggle('js-checkbox-elements__inviseble');
        arrowDown.classList.toggle('js-checkbox-elements__inviseble');
        listOfOptions.classList.toggle('js-checkbox-elements__inviseble');   
    }



}

let allCheckboxList = document.querySelectorAll('.checkbox-list');
for (let checkboxList of allCheckboxList) {
    new AllCheckboxList(checkboxList);
}