import Cleave from 'cleave.js';


var cleave = new Cleave('.text-field_date', {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y']
});