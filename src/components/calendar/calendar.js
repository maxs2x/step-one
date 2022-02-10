import '../dropdown/dropdown.js';

import AirDatepicker from 'air-datepicker';
import './calendar.scss';


if (document.querySelectorAll('.js-date-filter__input')) {
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


if (document.querySelectorAll('.js-date-range')) {
    let dpMin, dpMax;
    dpMin = new AirDatepicker('.js-date-range__date-in', {
        onSelect({date}) {
            dpMax.update({
                minDate: date
            })
        },
        position({$datepicker, $target, $pointer}) {
            let coords = $target.getBoundingClientRect();
        
            let top =  coords.y + coords.height + window.scrollY + 6;
            let left = coords.x  ;
        
            $datepicker.style.left = `${left}px`;
            $datepicker.style.top = `${top}px`;
        
            $pointer.style.display = 'none';
        },
        buttons: ['clear',
            {
                content: 'Применить',
                onClick() {
                    if (dpMin.selectedDates.length == 1) {
                        dpMin.hide(); 
                    }
                }
            }
        ],
        minDate: new Date(),
        prevHtml: '<span class="air-datepicker__prev-button">arrow_back</span>',
        nextHtml: '<span class="air-datepicker__next-button">arrow_forward</span>'
    });

    dpMax = new AirDatepicker('.js-date-range__date-out', {
        onSelect({date}) {
            dpMin.update({
                maxDate: date
            })
        },
        position({$datepicker, $target, $pointer}) {
            let coords = $target.getBoundingClientRect(),
                dpWidth = $datepicker.clientWidth;
        
            let top =  coords.y + coords.height + window.scrollY + 6;
            let left = coords.x - dpWidth / 1.87;
        
            $datepicker.style.left = `${left}px`;
            $datepicker.style.top = `${top}px`;
        
            $pointer.style.display = 'none';
        },
        buttons: ['clear',
            {
                content: 'Применить',
                onClick() {
                    if ( dpMax.selectedDates.length == 1) {
                        dpMax.hide(); 
                    }
                }
            }
        ],
        minDate: new Date(),
        prevHtml: '<span class="air-datepicker__prev-button">arrow_back</span>',
        nextHtml: '<span class="air-datepicker__next-button">arrow_forward</span>'
    })
};



