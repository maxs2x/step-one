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

class OneDay {
    constructor(day) {
        this._day = day;
        this._day.onclick = this.insertDay.bind(this);
        this.selectedDay = this._day.innerHTML;
        this.Month = this._day.closest('.dropdown-js__month-calendar').querySelector('.month-name').innerHTML;
        this.selectedMonth = this.convertingMonthToDate();
        this.selectedYear = this._day.closest('.dropdown-js__month-calendar').querySelector('.year-name').innerHTML;
        this.fullDate = this.selectedDay + '.' + this.selectedMonth + '.' + this.selectedYear;
    }

    convertingMonthToDate() {
        let months = {'январь': '01','февраль': '02','март':'03','апрель':'04','май':'05','июнь':'06','июль':'07','август':'08','сентябрь':'09','октябрь':'10','ноябрь':'11','декабрь':'12'};
        let selectedMonth = months[this.Month];
        return selectedMonth;
    }

    validationDate() {
        nowDate = new Date();
        nowDateNumber = String(nowDate.getDate()) + String(nowDate.getMonth()) + String(nowDate.getFullYear());
        console.log(nowDateNumber);
        if (Number(this.selectedYear) >= nowDate.getFullYear()) { 
            console.log(Number(this.selectedYear), nowDate.getFullYear());
            if (Number(this.selectedMonth) >= (nowDate.getMonth() + 1)) {
                console.log(Number(this.selectedMonth), nowDate.getMonth());
                if (Number(this.selectedDay) >= nowDate.getDate()) {
                    console.log(Number(this.selectedDay), nowDate.getDate());
                    return true;
                } else {
                    return false;
                };
            } else {
                return false;
            };
        } else {
            return false;
        };
    }

    insertDay() {
        if (this.validationDate()) {
            this._day.classList.toggle('insert-day');
            this._day.closest('.dropdown-js').querySelector('.dropdown-button p').innerHTML = this.fullDate;
            console.log(this.fullDate);
        };        
    }
}

class Calendar {
    constructor(elem) {
        this._elem = elem;
        this.container = this._elem;
        this.nowDate = new Date();
        this.nowDateNumber = this.nowDate.getDate();
        this.nowMonth = this.nowDate.getMonth();
        this.nowYear = this.nowDate.getFullYear();
        this.container = this._elem;
        this.monthContainer = this.container.querySelector('.month-name');
        this.yearContainer = this.container.querySelector('.year-name');
        this.daysContainer = this.container.querySelector('.days');
        this.prev = this.container.querySelector('.prev');
        this.next = this.container.querySelector('.next');
        this.monthName = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
        this.curDate = this.nowDate.setMonth(this.nowDate.getMonth() - 1);
        this.setMonthCalendar(this.nowYear, this.nowMonth);
        this.setHandlerOnDay();
        this._elem.querySelector('.prev').onclick = this.prevMonth.bind(this);
        this._elem.querySelector('.next').onclick = this.nextMonth.bind(this);
    }

    setMonthCalendar(year, month) {
        let monthDays = new Date(year, month + 1, 0).getDate(),
            monthPrefix = new Date(year, month, 0).getDay(),
            monthDaysText = '';
    
        this.monthContainer.textContent = this.monthName[month];
        this.yearContainer.textContent = year;
        this.daysContainer.innerHTML = '';
    
        if (monthPrefix > 0){
            for (let i = 1  ; i <= monthPrefix; i++){
                monthDaysText += '<li></li>';
            }
        }
    
        for (let i = 1; i <= monthDays; i++){
            monthDaysText += '<li>' + i + '</li>';
        }
    
        this.daysContainer.innerHTML = monthDaysText;
    
        if (month == this.nowMonth && year == this.nowYear){
            days = this.daysContainer.getElementsByTagName('li');
            days[monthPrefix + this.nowDateNumber - 1].classList.add('date-now');
        }
    }

    nextMonth() {
        let curDate = new Date(this.yearContainer.textContent,this.monthName.indexOf(this.monthContainer.textContent));

        curDate.setMonth(curDate.getMonth() + 1);

        let curYear = curDate.getFullYear(),
            curMonth = curDate.getMonth();

        this.setMonthCalendar(curYear,curMonth);
        this.setHandlerOnDay();
        console.log('querySelector nov');
    }

    prevMonth() {
        let curDate = new Date(this.yearContainer.textContent,this.monthName.indexOf(this.monthContainer.textContent));

        curDate.setMonth(curDate.getMonth() - 1);

        let curYear = curDate.getFullYear(),
            curMonth = curDate.getMonth();

        this.setMonthCalendar(curYear,curMonth);
        this.setHandlerOnDay();
        console.log('querySelector prev');
    }

    

    setHandlerOnDay() {
        let allDaysInMonth = this.container.querySelectorAll('.days li');
        console.log('setHandlerOnDay ' + allDaysInMonth);
        for (let day of allDaysInMonth) {
            new OneDay(day);
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
    
        arrowRight.classList.toggle('dropdown-js__inviseble');
        arrowDown.classList.toggle('dropdown-js__inviseble');
        listOfOptions.classList.toggle('dropdown-js__inviseble');     
      
    }

    openPart () {
        if (this._elem.querySelector('.dropdown-js__list-of-options')) {
            new DropdownOpenPart(elem.querySelector(this.invisibleBlock));
        } else {
            console.log('cikle openPare ' + this._elem.querySelector(this.invisibleBlock));
            new Calendar(this._elem.querySelector(this.invisibleBlock));
        };
    }
}

let allDropdowns = document.querySelectorAll('.dropdown-js');
for (let dropdown of allDropdowns) {
    new Dropdown(dropdown);
}
