class OneDay {
    constructor(day) {
        this._day = day;
        this._day.onclick = this.insertDay.bind(this);
        this.selectedDay = this._day.innerHTML;
        this.Month = this._day.closest('.dropdown-js__month-calendar').querySelector('.calendar__month-name').innerHTML;
        this.selectedMonth = this.convertingMonthToDate();
        this.selectedYear = this._day.closest('.dropdown-js__month-calendar').querySelector('.calendar__year-name').innerHTML;
        this.fullDate = this.selectedDay + '.' + this.selectedMonth + '.' + this.selectedYear;
        this.revercefullDate = this.selectedYear + '-' + this.selectedMonth + '-' + this.selectedDay;
    }

    convertingMonthToDate() {
        let months = {'январь': '01','февраль': '02','март':'03','апрель':'04','май':'05','июнь':'06','июль':'07','август':'08','сентябрь':'09','октябрь':'10','ноябрь':'11','декабрь':'12'};
        let selectedMonth = months[this.Month];
        return selectedMonth;
    }

    dateEntryInSessionStorage() {
        if ((sessionStorage.length === 0) || (sessionStorage.length === 1)) {
            sessionStorage.setItem(this.revercefullDate, this.revercefullDate);
        };        
    }

    dateRemoveInSessionStorage() {
        sessionStorage.removeItem(this.revercefullDate);
    };

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
        let nowDate = new Date(),
            nowDateNumber = String(nowDate.getDate()) + String(nowDate.getMonth()) + String(nowDate.getFullYear()),
            result = this.matchingWithInsertDate(nowDate);
        return result;
    }

    validationReSelection() {
        if (this._day.closest('.calendar__days').querySelector('.calendar__insert-day')) {
            this._day.closest('.calendar__days').querySelector('.calendar__insert-day').classList.toggle('calendar__insert-day');
        }
    }

    insertDay() {
        if (this.validationDate()) {
            this.validationReSelection();
            this._day.classList.toggle('calendar__insert-day');
            this._day.closest('.dropdown-js').querySelector('.dropdown-button p').innerHTML = this.fullDate;
            this.dateEntryInSessionStorage()
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

    paintUpInterval(day) {
        if (!day.classList.contains('calendar__insert-day')) {
            day.classList.toggle('calendar__selected-interval');;
        }
    }

    validationInterval(dayStart, dayStop) {
        let innerDayStop = Number(dayStop.innerHTML),
            innerDayStart = Number(dayStart.innerHTML);
        if ((innerDayStart - 1) < innerDayStop) {
            this.paintUpInterval(dayStart);
            if ((dayStart.nextSibling !== null) && (dayStart.nextSibling.matches('.calendar__day'))) {
                this.validationInterval(dayStart.nextSibling, dayStop);
            };
        };
    }

    searchForfirstDay() {
        let dayOne = new Date(sessionStorage.key(0)),
            dayTwo = new Date(sessionStorage.key(1));
        if (dayOne < dayTwo) {
            this.onDay = dayOne;
            this.toDay = dayTwo;
        } else {
            this.onDay = dayTwo;
            this.toDay = dayOne;
        };
    }

    toggleInlineStyleFirstAndSecondDays(firstInsertDay, secondInsertDay) {
        console.log(firstInsertDay, secondInsertDay);
        if (firstInsertDay !== 0) {
            firstInsertDay.classList.toggle('calendar__insert-day_first-insert');
        };
        if (secondInsertDay !== 0) {
            secondInsertDay.classList.toggle('calendar__insert-day_last-insert');
        }
    }

    intervalРighlighting () {
        this.searchForfirstDay();
        let nowDate = new Date(this.revercefullDate),
            dayStart = '',
            dayStop = '',
            dayStartForInlineStyle = 0,
            dayStopForInlineSyle = 0;
        // если кликнутый день совпадает с наибольшим выбранным
        if ( String(nowDate) === String(this.toDay)) {
            dayStop = this._day;
            dayStopForInlineSyle = this._day;
        // Установка даты СТАРТА
            // если кликнутый месяц и год совпадает с наибольшим выбранным
            // то ставим дату СТАРТА в этом месяце
            if ((String(this.onDay.getMonth()) === String(nowDate.getMonth())) && (String(this.onDay.getFullYear()) === String(nowDate.getFullYear()))) {
                for (let day of this._day.closest('.calendar__days').querySelectorAll('.calendar__day')) {
                    if (Number(day.innerHTML) === Number(this.onDay.getDate())) {
                        dayStart = day;
                        dayStartForInlineStyle = day;
                    };
                }
            // если совпадает только год то
            // закрашиваем все даты левее даты стопа
            } else {
                dayStart =  this._day.closest('.calendar__days').querySelector('.calendar__day');
            };

        } else {
            // иначе кликнутый день меньше второго выбранного дня
            // устанавливаем кликнутый день как СТАРТ
            dayStart = this._day;
            dayStartForInlineStyle = this._day;
        // Установка даты СОТП
            // если кликнутый месяц и год совпадает с наибольшим выбранным
            // то ставим дату СТОПА в этом месяце
            if ((String(this.toDay.getMonth()) === String(nowDate.getMonth())) && (String(this.toDay.getFullYear()) === String(nowDate.getFullYear()))) {
                for (let day of this._day.closest('.calendar__days').querySelectorAll('.calendar__day')) {
                    if (Number(day.innerHTML) === Number(this.toDay.getDate())) {
                        dayStop = day;
                        dayStopForInlineSyle = day;
                    };
                }
            } else {
            // если совпадает только год то
            // закрашиваем все даты правее даты стопа
                let daysInMonth =  this._day.closest('.calendar__days').querySelectorAll('.calendar__day').length;
                dayStop =  this._day.closest('.calendar__days').querySelectorAll('.calendar__day')[daysInMonth - 1];
            };

        }
        this.validationInterval(dayStart, dayStop);
        this.toggleInlineStyleFirstAndSecondDays(dayStartForInlineStyle, dayStopForInlineSyle);
    }

    removeIntervalРighlighting() {
        let parentAllDays = this._day.closest('.calendar__days'),
            allDays = parentAllDays.querySelectorAll('.calendar__day');
        for (let day of allDays) {
            if (day.matches('.calendar__selected-interval')) {
                day.classList.remove('calendar__selected-interval');
            };
            if (day.matches('.calendar__insert-day_last-insert')){
                day.classList.remove('calendar__insert-day_last-insert');
            };
            if (day.matches('.calendar__insert-day_first-insert')) {
                console.log(day.matches('.calendar__insert-day_first-insert'));
                day.classList.remove('calendar__insert-day_first-insert');
            };
        }
    }

    insertDay () {
        if (this.validationDate()) {
            if (Number(sessionStorage.length) === 2) {
                if (this._day.classList.contains('calendar__insert-day')) {
                    this._day.classList.toggle('calendar__insert-day');
                    this.dateRemoveInSessionStorage();
                    this.removeIntervalРighlighting();
                    console.log('insertDay 1');
                };
            } else if (Number(sessionStorage.length) < 2) {
                if (this._day.classList.contains('calendar__insert-day')) {
                    this._day.classList.toggle('calendar__insert-day');
                    this.dateRemoveInSessionStorage();
                    this.removeIntervalРighlighting();
                    console.log('insertDay 2');
                } else {
                    this._day.classList.toggle('calendar__insert-day');
                    this.dateEntryInSessionStorage();
                    if (sessionStorage.length === 2) {
                        this.intervalРighlighting();
                        console.log('insertDay 3');
                    };
                }
            }; 
        }; 
    }
}

class TwoDate extends RangeDays {
    constructor(day) {
        super(day);
    }
}

class Calendar {
    constructor(elem) {
        this._elem = elem;
        this.container = elem;
        this.nowDate = new Date();
        this.nowDateNumber = this.nowDate.getDate();
        this.nowMonth = this.nowDate.getMonth();
        this.nowYear = this.nowDate.getFullYear();
        this.container = this._elem;
        this.monthContainer = this.container.querySelector('.calendar__month-name');
        this.yearContainer = this.container.querySelector('.calendar__year-name');
        this.daysContainer = this.container.querySelector('.calendar__days');
        this.prev = this.container.querySelector('.calendar__prev');
        this.next = this.container.querySelector('.calendar__next');
        this.monthName = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
        this.monthNumber = {0:'01', 1:'02', 2:'03', 3:'04', 4:'05', 5:'06', 6:'07', 7:'08', 8:'09', 9:'10', 10:'11', 11:'12'}
        this.curDate = this.nowDate.setMonth(this.nowDate.getMonth() - 1);
        this.setMonthCalendar(this.nowYear, this.nowMonth);
        this.filterType = this.filterTypeSelection();
        this.setHandlerEveryDay();
        this.prev.onclick = this.prevMonth.bind(this);
        this.next.onclick = this.nextMonth.bind(this);
        this._elem.querySelector('.calendar__button_cancel').onclick = this.cancelFilter.bind(this);
        this._elem.querySelector('.calendar__button_apply').onclick = this.applyFilter.bind(this);
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
        let dayOne = new Date(sessionStorage.key(0)),
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
            monthDaysText = '',
            countInsertDay = sessionStorage.length,
            firstInsertDay = 0,
            nextInsertDay = 0,
            lastInsertDay = 0,
            days = 0;
        
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
            let lastDay = new Date(year, month, 0);
            for (let i = 1  ; i <= monthPrefix; i++){
                lastDay.setDate(lastDay.getDate() - ( monthPrefix - i));
                monthDaysText += '<li class="calendar__day-prev-month">' + lastDay.getDate() + '</li>';
                lastDay = new Date(year, month, 0);
            }
        }
        
    
        for (let i = 1; i <= monthDays; i++){
            if (!(firstInsertDay === 0) && (i === firstInsertDay)) {
                // отрисовываем первый выбраннный день если он в этом месяце
                console.log('отрисовываем первый выбраннный день в этом месяце');
                monthDaysText += '<li class="calendar__day calendar__insert-day calendar__insert-day_first-insert">' + i + '</li>';
            } else if ((firstInsertDay < i) && (i < lastInsertDay) && (firstInsertDay !== 0)) {
                // отрисовываем выделенный промежуток
                monthDaysText += '<li class="calendar__day calendar__selected-interval">' + i + '</li>';
            } else if ((firstInsertDay === 0) && (i < lastInsertDay) && (nextInsertDay !== 0)) {
                // отрисовываем выделенный промежуток
                monthDaysText += '<li class="calendar__day calendar__selected-interval">' + i + '</li>';
            } else if ((i > firstInsertDay) && (lastInsertDay === 0) && (nextInsertDay === 33)) {
                // отрисовываем выделенный промежуток
                monthDaysText += '<li class="calendar__day calendar__selected-interval">' + i + '</li>';
            } else if (i === lastInsertDay) {
                // отрисовываем последний выбраннный день если он в этом месяце
                monthDaysText += '<li class="calendar__day calendar__insert-day calendar__insert-day_last-insert">' + i + '</li>';
            } else {
                // отрисовываем невыделенные дни
                monthDaysText += '<li class="calendar__day">' + i + '</li>';
            }
        }

        this.daysContainer.innerHTML = monthDaysText;

        let countElementsForDays = this.daysContainer.querySelectorAll('li').length,
            countDaysBeforeInsertMonth = 7 - (countElementsForDays % 7),
            lastDay = new Date(year, month + 1, 0);
            console.log(countDaysBeforeInsertMonth);
        for (let i = 1; i <= countDaysBeforeInsertMonth; i++) {
            lastDay.setDate(lastDay.getDate() + i);
            monthDaysText += '<li class="calendar__day-next-month">' + lastDay.getDate() + '</li>';
            lastDay = new Date(year, month + 1, 0);
        }
    
        this.daysContainer.innerHTML = monthDaysText;
    
        if (month == this.nowMonth && year == this.nowYear){
            days = this.daysContainer.querySelectorAll('.calendar__day');
            days[monthPrefix + this.nowDateNumber - 1].classList.add('calendar__date-now');
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
        let allDaysInMonth = this.container.querySelectorAll('.calendar__day');
        for (let day of allDaysInMonth) {
            if (this.filterType === 'oneDay') {
                new TwoDate(day);
            } else {
                new RangeDays(day);
            };
        }
    }

    hideCalendar() {
        console.log('hideCalendar');
        let dropdown = this._elem.closest('.dropdown-js');
        let arrowRight = dropdown.querySelector('.dropdown-js__arrow_up');
        let arrowDown = dropdown.querySelector('.dropdown-js__arrow_down');
        let listOfOptions = dropdown.querySelector('.dropdown-js__month-calendar');
    
        arrowRight.classList.toggle('dropdown-js__inviseble');
        arrowDown.classList.toggle('dropdown-js__inviseble');
        listOfOptions.classList.toggle('dropdown-js__inviseble');   

        if (sessionStorage.length !== 2) {
            for (let elem of dropdown.querySelectorAll('.calendar__days li')) {
                if (elem.matches('.calendar__insert-day')) {
                    elem.classList.toggle('calendar__insert-day');
                };
                if (elem.matches('.calendar__selected-interval')) {
                    elem.classList.toggle('calendar__selected-interval');
                };
            }
        };
    }

    cancelFilter() {
        sessionStorage.clear();
        this.setMonthCalendar(this.nowYear, this.nowMonth);
        this.setHandlerEveryDay();
    }

    applyFilter() {
        let dropdown = this._elem.closest('.dropdown-js');
        let placeholder = dropdown.querySelector('.dropdown-button p');
        let shortMonthName = ['янв','фвр','мрт','апр','май','инь','иль','авг','сен','окт','ноя','дек'];
        
        if ((dropdown.querySelectorAll('.dropdown-js__calendar_filtre').length === 0) && (this.filterType !== 'oneDay')) {
            console.log('hideCalendar1');
            this.hideCalendar();
            return;
            
        }
        if (sessionStorage.length < 2) {
            let setDate = new Date(sessionStorage.key(0));
            let fromDate = setDate.getDate() + '.' + this.monthNumber[Number(setDate.getMonth())] + '.' + setDate.getFullYear();
            placeholder.innerHTML = fromDate;
            this.hideCalendar();
        };
        if (sessionStorage.length === 2 && (this.filterType !== 'oneDay')) {
            this.searchForfirstDay();
            let fromDate = String(this.onDay.getDate()) + ' ' + shortMonthName[this.onDay.getMonth()];
            let toDate = String(this.toDay.getDate()) + ' ' + shortMonthName[this.toDay.getMonth()];
            placeholder.innerHTML = fromDate + ' - ' + toDate;
            this.hideCalendar();
            console.log('hideCalendar3');
        } else if (sessionStorage.length === 2 && (this.filterType === 'oneDay')) {
            let setDate = new Date(sessionStorage.key(1));
            let fromDate = setDate.getDate() + '.' + this.monthNumber[Number(setDate.getMonth())] + '.' + setDate.getFullYear();
            placeholder.innerHTML = fromDate;
            this.hideCalendar();
        }
    }
}

export {Calendar, OneDay, RangeDays};