class Calendar {
    nowDate = new Date();
    nowDateNumber = nowDate.getDate();
    nowMonth = nowDate.getMonth();
    nowYear = nowDate.getFullYear();
    container = document.querySelector('.dropdown-js__month-calendar');
    monthContainer = container.querySelector('.month-name');
    yearContainer = container.querySelector('.year-name');
    daysContainer = container.querySelector('.days');
    prev = container.querySelector('.prev');
    next = container.querySelector('.next');
    monthName = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
    curDate = nowDate.setMonth(nowDate.getMonth() - 1);

    constructor(elem) {
        this._elem = elem;
        this.setMonthCalendar(this.nowYear, this.nextMonth);
        this.querySelector('.prev').onclick = this.prevMonth.bind(this);
        this.querySelector('.next').onclick = this.nextMonth.bind(this);
    }

    setMonthCalendar() {
        let monthDays = new Date(this.year, this.month + 1, 0).getDate(),
            monthPrefix = new Date(this.year, this.month, 0).getDay(),
            monthDaysText = '';
    
        monthContainer.textContent = monthName[this.month];
        yearContainer.textContent = this.year;
        daysContainer.innerHTML = '';
        console.log(this.year,this.month);
    
        if (monthPrefix > 0){
            for (let i = 1  ; i <= monthPrefix; i++){
                monthDaysText += '<li></li>';
            }
        }
    
        for (let i = 1; i <= monthDays; i++){
            monthDaysText += '<li>' + i + '</li>';
        }
    
        daysContainer.innerHTML = monthDaysText;
    
        if (this.month == nowMonth && this.year == nowYear){
            days = daysContainer.getElementsByTagName('li');
            days[monthPrefix + nowDateNumber - 1].classList.add('date-now');
        }
    }

    nextMonth() {
        let curDate = new Date(this.yearContainer.textContent,monthName.indexOf(this.monthContainer.textContent));

        curDate.setMonth(curDate.getMonth() + 1);

        let curYear = curDate.getFullYear(),
            curMonth = curDate.getMonth();

        setMonthCalendar(curYear,curMonth);
        console.log('querySelector nov');
    }

    prevMonth() {
        let curDate = new Date(this.yearContainer.textContent,monthName.indexOf(this.monthContainer.textContent));

        curDate.setMonth(curDate.getMonth() - 1);

        let curYear = curDate.getFullYear(),
            curMonth = curDate.getMonth();

        setMonthCalendar(curYear,curMonth);
        console.log('querySelector prev');
    }
}