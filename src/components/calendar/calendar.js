import '../dropdown/dropdown.js';

import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'

if (document.querySelectorAll('.date-filter')) {
    let dateFilter = document.querySelectorAll('.date-filter');
    for (let elem of dateFilter) {
        new AirDatepicker(elem);
    }
};


if (document.querySelectorAll('.date-range')) {
    let dateRange = document.querySelectorAll('.date-range');

    for (let elem of dateRange) {
        let dateRangeIn = elem.querySelectorAll('#datein'),
            dateRangeOut = elem.querySelectorAll('#dateout'),
            dpMin, dpMax;
        console.log(dateRangeIn);
        dpMin = new AirDatepicker('#datein', {
            onSelect({date}) {
                dpMax.update({
                    minDate: date
                })
            }
        })

        dpMax = new AirDatepicker('#dateout', {
            onSelect({date}) {
                dpMin.update({
                    maxDate: date
                })
            }
        })
    }
};



