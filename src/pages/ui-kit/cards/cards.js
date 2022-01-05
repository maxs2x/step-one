import '../../../components/rooms-search/rooms-search.js';
import '../../../components/reservation/reservation.js';
import '../../../components/dropdown/dropdown.js';
import {Calendar, OneDay, RangeDays} from '../../../components/dropdown/_calendar/calendar';

let calendar = document.querySelector('.content-cards__third-column .dropdown-js__month-calendar');
if (calendar.classList.contains('dropdown-js__inviseble')) {
    calendar.classList.remove('dropdown-js__inviseble');
}
new Calendar(calendar);