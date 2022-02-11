import '../dropdown/dropdown.js';

import AirDatepicker from 'air-datepicker';
import './calendar.scss';


if (document.querySelectorAll('.js-date-filter__input') .length !== 0) {
    let dateFilter = document.querySelectorAll('.js-date-filter__input');
    for (let elem of dateFilter) {
        let calendar = new AirDatepicker(elem, {
            buttons: ['clear',
                {
                    content: 'Применить',
                    onClick() {
                        if (calendar.selectedDates.length == 2) {
                            calendar.hide(); 
                        }
                    }
                }
            ],
            range: true,
            dynamicRange: true,
            multipleDatesSeparator: ' - ',
            minDate: new Date(),
            prevHtml: '<span class="air-datepicker__prev-button">arrow_back</span>',
            nextHtml: '<span class="air-datepicker__next-button">arrow_forward</span>'
        });
    }
};

if (document.querySelectorAll('.js-date-range').length !== 0) {
    let dateFilter = document.querySelectorAll('.js-date-range__date-in'),
        additionalField = document.querySelectorAll('.js-date-range__date-out'),
        initializedCalendar = document.querySelector('.js-date-range__calendar');
    
    let calendar = new AirDatepicker(initializedCalendar, {
        multipleDates: 2,
        buttons: [{
                content: 'Очистить',
                onClick() {
                    calendar.clear();
                    calendar.hide(); 
                }
            },
            {
                content: 'Применить',
                onClick() {
                    if (calendar.selectedDates.length == 2) {
                        calendar.hide(); 
                    }
                }
            }
        ],
        inline: false,
        visible: false,
        position({$datepicker, $target, $pointer}) {
            let coords = document.querySelector('.js-date-range__date-in').getBoundingClientRect(),
                dpWidth = $datepicker.clientWidth;
        
            let top =  coords.y + coords.height + window.scrollY + 6;
            let left = coords.x;
        
            $datepicker.style.left = `${left}px`;
            $datepicker.style.top = `${top}px`;
        
            $pointer.style.display = 'none';
        },
        range: true,
        dateFormat: 'dd.MM.yyyy',
        minDate: new Date(),
        prevHtml: '<span class="air-datepicker__prev-button">arrow_back</span>',
        nextHtml: '<span class="air-datepicker__next-button">arrow_forward</span>',
        onSelect({date, formattedDate, datepicker}) {
            dateFilter[0].setAttribute('value', ((formattedDate[0] !== undefined) ? formattedDate[0] : document.querySelector('.js-date-range__date-in').getAttribute('placeholder'))),
            additionalField[0].setAttribute('value', ((formattedDate[1] !== undefined) ? formattedDate[1] : document.querySelector('.js-date-range__date-out').getAttribute('placeholder')))
        },
    });

    function show() {
        calendar.show();
    };

    document.querySelector('.js-date-range__date-in').addEventListener("click", show);
    document.querySelector('.js-date-range__date-out').addEventListener("click", show);

    
    
};



