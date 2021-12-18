// import '../calendar/calendar.js';

function dropdownFunction() {
    let arrowRight = document.querySelector('.dropdown-js__arrow_up');
    let arrowDown = document.querySelector('.dropdown-js__arrow_down');
    let calendar = document.querySelector('.dropdownJs__calendar');
    arrowRight.classList.toggle('dropdown-js__inviseble');
    arrowDown.classList.toggle('dropdown-js__inviseble');
    calendar.classList.toggle('dropdown-js__inviseble');      
};


function dropdownCalendarHendler() {
    alert('calendar');
};
