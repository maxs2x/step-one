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

    matchingWithInsertDate(dateForMatching) {
        if (Number(this.selectedYear) >= dateForMatching.getFullYear()) { 
            console.log(Number(this.selectedYear), dateForMatching.getFullYear());
            if (Number(this.selectedMonth) >= (dateForMatching.getMonth() + 1)) {
                console.log(Number(this.selectedMonth), dateForMatching.getMonth());
                if (Number(this.selectedDay) >= dateForMatching.getDate()) {
                    console.log(Number(this.selectedDay), dateForMatching.getDate());
                    return true;
                } else if (Number(this.selectedMonth) > (dateForMatching.getMonth() + 1)) {
                    return true;
                } else {
                    return false;
                };
            } else if (Number(this.selectedYear) > dateForMatching.getFullYear()) {
                return true;
            } else {
                return false;
            };
        } else {
            return false;
        };
    }

    validationDate() {
        nowDate = new Date();
        nowDateNumber = String(nowDate.getDate()) + String(nowDate.getMonth()) + String(nowDate.getFullYear());
        console.log(nowDateNumber);
        result = this.matchingWithInsertDate(nowDate);
        return result;
    }

    validationReSelection() {
        if (this._day.closest('.days').querySelector('.insert-day')) {
            this._day.closest('.days').querySelector('.insert-day').classList.toggle('insert-day');
        }
    }

    insertDay() {
        if (this.validationDate()) {
            this.validationReSelection();
            this._day.classList.toggle('insert-day');
            this._day.closest('.dropdown-js').querySelector('.dropdown-button p').innerHTML = this.fullDate;
        };        
    }
}

class RangeDays extends OneDay{
    constructor(day) {
        super(day);
        this.onDay = Object;
        this.toDay = Object;
        this.revercefullDate = this.selectedYear + '-' + this.selectedMonth + '-' + this.selectedDay;
    }

    checkNumberInsertDays() {
        parentAllDays = this._day.closest('.days');
        console.log(parentAllDays.querySelectorAll('.insert-day'));
        return parentAllDays.querySelectorAll('.insert-day');
    }

    paintUpInterval(day) {
        if (!day.classList.contains('insert-day')) {
            day.classList.toggle('selected-interval');;
        }
    }

    validationInterval(dayStart, dayStop) {
        innerDayStop = Number(dayStop.innerHTML);
        innerDayStart = Number(dayStart.innerHTML);
        if ((innerDayStart - 1) < innerDayStop) {
            this.paintUpInterval(dayStart);
            if (dayStart.nextSibling !== null) {
                this.validationInterval(dayStart.nextSibling, dayStop);
            };
        };
    }

    searchForfirstDay() {
        dayOne = new Date(sessionStorage.key(0));
        dayTwo = new Date(sessionStorage.key(1));
        if (dayOne < dayTwo) {
            this.onDay = dayOne;
            this.toDay = dayTwo;
        } else {
            this.onDay = dayTwo;
            this.toDay = dayOne;
        };
        console.log('searchForfastDay dayOne dayTwo ' + String(dayOne) + String(dayTwo));
    }

    intervalРighlighting () {
        this.searchForfirstDay();
        nowDate = new Date(this.revercefullDate);
        console.log('this.revercefullDate ' + String(this.revercefullDate));
        let dayStart = '';
        let dayStop = '';
        console.log('intervalРighlighting ' + this.toDay + '   ' + nowDate);
        // this.fullDate = this.selectedDay + '.' + this.selectedMonth + '.' + this.selectedYear;
        // если кликнутый день совпадает с наибольшим выбранным
        if ( String(nowDate) === String(this.toDay)) {
            dayStop = this._day;
        // Установка даты СТАРТА
            // если кликнутый месяц и год совпадает с наибольшим выбранным
            // то ставим дату СТАРТА в этом месяце
            if ((String(this.onDay.getMonth()) === String(nowDate.getMonth())) && (String(this.onDay.getFullYear()) === String(nowDate.getFullYear()))) {
                for (day of this._day.closest('.days').querySelectorAll('li')) {
                    if (Number(day.innerHTML) === Number(this.onDay.getDate())) {
                        dayStart = day;
                    };
                }
            // если совпадает только год то
            // закрашиваем все даты левее даты стопа
            } else {
                dayStart =  this._day.closest('.days').querySelector('li');
            };

        } else {
            // иначе кликнутый день меньше второго выбранного дня
            // устанавливаем кликнутый день как СТАРТ
            dayStart = this._day;
        // Установка даты СОТП
            // если кликнутый месяц и год совпадает с наибольшим выбранным
            // то ставим дату СТОПА в этом месяце
            if ((String(this.toDay.getMonth()) === String(nowDate.getMonth())) && (String(this.toDay.getFullYear()) === String(nowDate.getFullYear()))) {
                for (day of this._day.closest('.days').querySelectorAll('li')) {
                    if (Number(day.innerHTML) === Number(this.toDay.getDate())) {
                        dayStop = day;
                    };
                }
            } else {
            // если совпадает только год то
            // закрашиваем все даты правее даты стопа
                dayStop =  this._day.closest('.days').lastChild;
                console.log('day stop ' + String(dayStop));
            };

        }
        this.validationInterval(dayStart, dayStop);
    }

    removeIntervalРighlighting (numberInsertDays) {
        if ((numberInsertDays === 1) || (numberInsertDays === 2)) {
            parentAllDays = this._day.closest('.days');
            allРighlightingDays = parentAllDays.querySelectorAll('.selected-interval');
            for (let day of allРighlightingDays) {
                day.classList.toggle('selected-interval');
            }
        };
    }

    dateEntryInSessionStorage() {
        console.log('lenght sesStor = ' + sessionStorage.length);
        if ((sessionStorage.length === 0) || (sessionStorage.length === 1)) {
            sessionStorage.setItem(this.revercefullDate, this.revercefullDate);
        };        
    }

    dateRemoveInSessionStorage() {
        sessionStorage.removeItem(this.revercefullDate);
    };

    insertDay () {
        if (this.validationDate()) {
            numberInsertDays = sessionStorage.length - 1;
            if (numberInsertDays < 2) {
                if (this._day.classList.contains('insert-day')) {
                    this._day.classList.toggle('insert-day');
                    this.dateRemoveInSessionStorage();
                    console.log('delet');
                } else {
                    this._day.classList.toggle('insert-day');
                    this.dateEntryInSessionStorage();
                    if (sessionStorage.length === 2) {
                        this.intervalРighlighting();
                    };
                    console.log('add');
                }
            } else if (this._day.classList.contains('insert-day')) {
                console.log('delet');
                this._day.classList.toggle('insert-day');
                // this.removeIntervalРighlighting(numberInsertDays);
                this.dateRemoveInSessionStorage();
            };
        }; 
        console.log(sessionStorage.key(0), sessionStorage.key(1));
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
        this.filterType = this.filterTypeSelection();
        this.setHandlerEveryDay();
        this._elem.querySelector('.prev').onclick = this.prevMonth.bind(this);
        this._elem.querySelector('.next').onclick = this.nextMonth.bind(this);
    }

    filterTypeSelection() {
        if (this._elem.closest('.dropdown-js__calendar_filtre')) {
            return 'range';
        } else {
            return 'oneDay';
        };
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
        this.setHandlerEveryDay();
        console.log('querySelector nov');
    }

    prevMonth() {
        let curDate = new Date(this.yearContainer.textContent,this.monthName.indexOf(this.monthContainer.textContent));

        curDate.setMonth(curDate.getMonth() - 1);

        let curYear = curDate.getFullYear(),
            curMonth = curDate.getMonth();

        this.setMonthCalendar(curYear,curMonth);
        this.setHandlerEveryDay();
        console.log('querySelector prev');
    }

    

    setHandlerEveryDay() {
        let allDaysInMonth = this.container.querySelectorAll('.days li');
        console.log('setHandlerOnD ' + allDaysInMonth);
        console.log('setHandlerEveryD ' + this.filterType)
        for (let day of allDaysInMonth) {
            if (this.filterType === 'oneDay') {
                new OneDay(day);
            } else {
                new RangeDays(day);
            };
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
