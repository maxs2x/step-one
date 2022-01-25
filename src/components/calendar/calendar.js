import '../dropdown/dropdown.js';

import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'


if (document.querySelectorAll('.date-filter')) {
    let dateFilter = document.querySelectorAll('.date-filter');
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


if (document.querySelectorAll('.date-range')) {
    let dpMin, dpMax;
    dpMin = new AirDatepicker('.datein', {
        onSelect({date}) {
            dpMax.update({
                minDate: date
            })
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

    dpMax = new AirDatepicker('.dateout', {
        onSelect({date}) {
            dpMin.update({
                maxDate: date
            })
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
        position: 'bottom right',
        prevHtml: '<span class="air-datepicker__prev-button">arrow_back</span>',
        nextHtml: '<span class="air-datepicker__next-button">arrow_forward</span>'
    })
};



