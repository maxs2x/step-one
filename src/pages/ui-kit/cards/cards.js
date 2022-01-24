import './cards.scss';

import '../../../components/rooms-search/rooms-search.js';
import '../../../components/reservation/reservation.js';
import '../../../components/dropdown/dropdown.js';
import '../../../components/room-card/room-card.js';

import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

let dateFilter = document.querySelector('#dropdown-js__calendar_filtre');
new AirDatepicker(dateFilter, {
    buttons: ['clear', 'today'],
    range: true,
    dynamicRange: true,
    multipleDatesSeparator: ' - ',
    minDate: new Date(),
    inline: true,
    prevHtml: '<span class="air-datepicker__prev-button">arrow_back</span>',
    nextHtml: '<span class="air-datepicker__next-button">arrow_forward</span>'
});