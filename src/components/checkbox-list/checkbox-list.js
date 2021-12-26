class AllCheckboxList {
    constructor(elem) {
        this._elem = elem;
        elem.querySelector('.checkbox-list__dropdown-button').onclick = this.openOrClose.bind(this);
  
    }

    openOrClose() {
        let arrowRight = this._elem.querySelector('.checkbox-list__arrow_up');
        let arrowDown = this._elem.querySelector('.checkbox-list__arrow_down');
        let listOfOptions = this._elem.querySelector('.checkbox-elements');
        console.log('openorclose');
        console.log(arrowDown, listOfOptions);

        arrowRight.classList.toggle('checkbox-elements__inviseble');
        arrowDown.classList.toggle('checkbox-elements__inviseble');
        listOfOptions.classList.toggle('checkbox-elements__inviseble');   
    }



}

let allCheckboxList = document.querySelectorAll('.checkbox-list');
for (let checkboxList of allCheckboxList) {
    new AllCheckboxList(checkboxList);
}