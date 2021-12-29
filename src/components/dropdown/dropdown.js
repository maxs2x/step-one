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
        for (oneString of this.allStringsOpenPart) {
            let buttonsInThisString = oneString.querySelectorAll('.quantity__button');
            for (buttonInString of buttonsInThisString) {
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
        let placeholder = parent.currentTarget.closest('.dropdown-js').querySelector('.dropdown-button p');
        let inputQuantity = parent.currentTarget.closest('.dropdown-js').querySelectorAll('input.quantity');
        let buttonClear = parent.currentTarget.closest('button');

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
        buttonClear = this.openPart.querySelectorAll('.dropdown-js__bottom-button button')[0];
        buttonApply = this.openPart.querySelectorAll('.dropdown-js__bottom-button button')[1];
        buttonClear.addEventListener('click', this.buttonHendlingClear);
        buttonApply.addEventListener('click', this.buttonHendlingApply);
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
        let dayStart = '';
        let dayStop = '';
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
            };

        }
        this.validationInterval(dayStart, dayStop);
    }

    removeIntervalРighlighting() {
        parentAllDays = this._day.closest('.days');
        allРighlightingDays = parentAllDays.querySelectorAll('.selected-interval');
        for (let day of allРighlightingDays) {
            day.classList.toggle('selected-interval');
        }
    }

    dateEntryInSessionStorage() {
        if ((sessionStorage.length === 0) || (sessionStorage.length === 1)) {
            sessionStorage.setItem(this.revercefullDate, this.revercefullDate);
        };        
    }

    dateRemoveInSessionStorage() {
        sessionStorage.removeItem(this.revercefullDate);
    };

    insertDay () {
        if (this.validationDate()) {
            if (Number(sessionStorage.length) === 2) {
                if (this._day.classList.contains('insert-day')) {
                    this._day.classList.toggle('insert-day');
                    this.dateRemoveInSessionStorage();
                    this.removeIntervalРighlighting();
                };
            } else if (Number(sessionStorage.length) < 2) {
                if (this._day.classList.contains('insert-day')) {
                    this._day.classList.toggle('insert-day');
                    this.dateRemoveInSessionStorage();
                    this.removeIntervalРighlighting();
                } else {
                    this._day.classList.toggle('insert-day');
                    this.dateEntryInSessionStorage();
                    if (sessionStorage.length === 2) {
                        this.intervalРighlighting();
                    };
                }
            }; 
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
        this.filterType = this.filterTypeSelection();
        this.setHandlerEveryDay();
        this._elem.querySelector('.prev').onclick = this.prevMonth.bind(this);
        this._elem.querySelector('.next').onclick = this.nextMonth.bind(this);
        this._elem.querySelector('.month-calendar_button_cancel').onclick = this.cancelFilter.bind(this);
        this._elem.querySelector('.month-calendar_button_apply').onclick = this.applyFilter.bind(this);
        this.onDay = Object;
        this.toDay = Object;
    }

    filterTypeSelection() {
        if (this._elem.closest('.dropdown-js__calendar_filtre')) {
            return 'range';
        } else {
            return 'oneDay';
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
    }

    setMonthCalendar(year, month) {
        let monthDays = new Date(year, month + 1, 0).getDate(),
            monthPrefix = new Date(year, month, 0).getDay(),
            monthDaysText = '';
            countInsertDay = sessionStorage.length;
            firstInsertDay = 0;
            nextInsertDay = 0;
            lastInsertDay = 0;
        
        this.monthContainer.textContent = this.monthName[month];
        this.yearContainer.textContent = year;
        this.daysContainer.innerHTML = '';

        if (countInsertDay === 1) {
            let insertDay = new Date(sessionStorage.key(0));
            if (Number(insertDay.getFullYear()) === Number(year)) {
                if (Number(insertDay.getMonth()) === Number(month)) {
                    lastInsertDay = insertDay.getDate();
                }
            }
        }

        // если диапазон задан, определяем его начало и конец
        if (countInsertDay === 2) {
            this.searchForfirstDay();
            //входит ли начало диапазона в отрисовываемый месяц
            if (Number(this.onDay.getFullYear()) === Number(year)) {
                // если входит - находим первый и второй выбранные дени
                if (Number(this.onDay.getMonth()) === Number(month)) {
                    firstInsertDay = Number(this.onDay.getDate());
                    nextInsertDay = firstInsertDay + 1;
                };
                // если первый выбранный день был раньше задаём начало отрисовки выделения
                if (Number(this.onDay.getMonth()) < Number(month)) {
                    nextInsertDay = 1;
                };
            // если первый выбранный день был раньше задаём начало отрисовки выделения
            } else if (Number(this.onDay.getFullYear()) < Number(year)) {
                nextInsertDay = 1;
            }
            //входит ли конец диапазона в отрисовываемый год
            if (Number(this.toDay.getFullYear()) === Number(year)) {
                // если входит - находим последний выбранный день
                if (Number(this.toDay.getMonth()) === Number(month)) {
                    lastInsertDay = Number(this.toDay.getDate());
                };
                // если последний выбранный день был позже задаём конец отрисовки выделения
                if ((Number(this.toDay.getMonth()) > Number(month) && (this.onDay.getMonth()) === Number(month))) {
                    nextInsertDay = 33;
                };
            // если последний выбранный день был позже задаём конец отрисовки выделения
            // и первый выбранный день в этом месяце
            } else if ((Number(this.toDay.getFullYear()) > Number(year)) && (this.onDay.getMonth()) === Number(month)) {
                nextInsertDay = 33;
            }
        }

        // установка пустых клеток месяца в начале
        if (monthPrefix > 0){
            for (let i = 1  ; i <= monthPrefix; i++){
                // если выбран день раньше этого месяца, 
                // присваиваем лишкам класс выделения
                if ((i > firstInsertDay) && (lastInsertDay === 0) && (nextInsertDay === 33)) {
                    monthDaysText += '<li class="selected-interval"></li>';
                } else if ((firstInsertDay === 0) && (i < lastInsertDay) && (nextInsertDay !== 0)) {
                    // отрисовываем выделенный промежуток
                    monthDaysText += '<li class="selected-interval">' + i + '</li>';
                } else if ((firstInsertDay < i) && (i < lastInsertDay) && (firstInsertDay !== 0)) {
                    // отрисовываем выделенный промежуток
                    monthDaysText += '<li class="selected-interval">' + i + '</li>';
                } else {
                    monthDaysText += '<li></li>';
                };
            }
        }
        
    
        for (let i = 1; i <= monthDays; i++){
            if (!(firstInsertDay === 0) && (i === firstInsertDay)) {
                // отрисовываем первый выбраннный день если он в этом месяце
                monthDaysText += '<li class="insert-day">' + i + '</li>';
            } else if ((firstInsertDay < i) && (i < lastInsertDay) && (firstInsertDay !== 0)) {
                // отрисовываем выделенный промежуток
                monthDaysText += '<li class="selected-interval">' + i + '</li>';
            } else if ((firstInsertDay === 0) && (i < lastInsertDay) && (nextInsertDay !== 0)) {
                // отрисовываем выделенный промежуток
                monthDaysText += '<li class="selected-interval">' + i + '</li>';
            } else if ((i > firstInsertDay) && (lastInsertDay === 0) && (nextInsertDay === 33)) {
                // отрисовываем выделенный промежуток
                monthDaysText += '<li class="selected-interval">' + i + '</li>';
            } else if (i === lastInsertDay) {
                // отрисовываем последний выбраннный день если он в этом месяце
                monthDaysText += '<li class="insert-day">' + i + '</li>';
            } else {
                // отрисовываем невыделенные дни
                monthDaysText += '<li>' + i + '</li>';
            }
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
    }

    prevMonth() {
        let curDate = new Date(this.yearContainer.textContent,this.monthName.indexOf(this.monthContainer.textContent));

        curDate.setMonth(curDate.getMonth() - 1);

        let curYear = curDate.getFullYear(),
            curMonth = curDate.getMonth();

        this.setMonthCalendar(curYear,curMonth);
        this.setHandlerEveryDay();
    }

    setHandlerEveryDay() {
        let allDaysInMonth = this.container.querySelectorAll('.days li');
        for (let day of allDaysInMonth) {
            if (this.filterType === 'oneDay') {
                new OneDay(day);
            } else {
                new RangeDays(day);
            };
        }
    }

    hideCalendar() {
        let dropdown = this._elem.closest('.dropdown-js');
        let arrowRight = dropdown.querySelector('.dropdown-js__arrow_up');
        let arrowDown = dropdown.querySelector('.dropdown-js__arrow_down');
        let listOfOptions = dropdown.querySelector('.dropdown-js__month-calendar');
    
        arrowRight.classList.toggle('dropdown-js__inviseble');
        arrowDown.classList.toggle('dropdown-js__inviseble');
        listOfOptions.classList.toggle('dropdown-js__inviseble');   

        if (sessionStorage.length !== 2) {
            for (let elem of dropdown.querySelectorAll('.days li')) {
                if (elem.matches('.insert-day')) {
                    elem.classList.toggle('insert-day');
                };
                if (elem.matches('.selected-interval')) {
                    elem.classList.toggle('selected-interval');
                };
            }
        };
    }

    cancelFilter() {
        sessionStorage.clear();
        this.hideCalendar();
    }

    applyFilter() {
        let dropdown = this._elem.closest('.dropdown-js');
        let placeholder = dropdown.querySelector('.dropdown-button p');
        let shortMonthName = ['янв','фвр','мрт','апр','май','инь','иль','авг','сен','окт','ноя','дек'];

        if (sessionStorage.length < 2) {
            alert('Пожалуйста, выберите дату "от" и дату "до"');
        };
        if (sessionStorage.length === 2 ) {
            this.searchForfirstDay();
            let fromDate = String(this.onDay.getDate()) + ' ' + shortMonthName[this.onDay.getMonth()];
            let toDate = String(this.toDay.getDate()) + ' ' + shortMonthName[this.toDay.getMonth()];
            placeholder.innerHTML = fromDate + ' - ' + toDate;
            this.hideCalendar();
        };
        
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
