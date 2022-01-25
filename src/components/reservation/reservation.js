import '../calendar/calendar.js';
import '../list-of-options/list-of-options.js';

class Reservations {
    constructor(block) {
        this.container = block;
        this.checkinDate = this.container.querySelector('.jd-datein').placeholder;
        this.checkoutDate = this.container.querySelector('.js-dateout').placeholder;
        this.pricePerDay = this.container.querySelector('.js-price-calculation__price-per-day');
        this.quantityDay = this.container.querySelector('.js-price-calculation__quantity-days');
        this.totalFirst = this.container.querySelector('.js-price-calculation__result');
        this.rightColumn = this.container.querySelectorAll('.js-row-with-price__numbers');
        this.totalElement = this.container.querySelectorAll('.js-reservation__total-text ')[1];
        this.calculationPreliminaryResult();
        this.calculationTotal();
        this.container.querySelector('.js-datein').onclick = this.update.bind(this);
        this.container.querySelector('.js-dateout').onclick = this.update.bind(this);
    }

    addSpaceForThousand(number) {
        let numberFormated = 0
        if ((number/1000) > 0) {
            numberFormated = String(number).slice(0, (String(number).length - 3)) + ' ' + String(number).slice(-3);
        };
        return numberFormated;
    }

    daysDifference(firstDay, secondDay) {
        let diff = new Date(+secondDay).setHours(12) - new Date(+firstDay).setHours(12);
        return Math.round(diff/8.64e7);
    }

    convertateDate(date) {
        let splitPlaceholder = date.split('.'),
            validDate = new Date(Number(splitPlaceholder[2]), (Number(splitPlaceholder[1]) - 1), Number(splitPlaceholder[0]));
        return validDate
    }

    calculationQuantityDays() {
        let firstDatePlaceholder = this.checkinDate,
            firstDay = this.convertateDate(firstDatePlaceholder),
            secondDatePlaceholder = this.checkoutDate,
            secondDay = this.convertateDate(secondDatePlaceholder),
            difference = this.daysDifference(firstDay, secondDay);
        return difference;
    }

    calculationPreliminaryResult() {
        let pricePerDay = Number(this.pricePerDay.innerHTML.slice(0,this.pricePerDay.innerHTML.length - 2).replace(/\s+/g, '')),
            quantityDay = this.calculationQuantityDays(),
            preliminaryResult = this.addSpaceForThousand(pricePerDay * quantityDay);
        this.quantityDay.innerHTML = quantityDay;
        this.totalFirst.innerHTML = preliminaryResult + '₽';
    }

    calculationTotal() {
        let discount = (Number(this.rightColumn[1].querySelector('p').innerHTML.slice(0,this.rightColumn[1].querySelector('p').innerHTML.length - 1).replace(/\s+/g, '')) === 0) ? -2179 : this.rightColumn[1].innerHTML.slice(0,this.pricePerDay.innerHTML.length - 2).replace(/\s+/g, '');
        let dopService = Number(this.rightColumn[2].querySelector('p').innerHTML.slice(0,this.rightColumn[2].querySelector('p').innerHTML.length - 1).replace(/\s+/g, ''));
        let total = this.addSpaceForThousand(Number(this.totalFirst.innerHTML.slice(0,this.pricePerDay.innerHTML.length - 1).replace(/\s+/g, '')) + discount + dopService);
        this.totalElement.innerHTML = total + '₽';
        console.log(this.totalFirst.innerHTML.slice(0,this.pricePerDay.innerHTML.length - 1).replace(/\s+/g, ''));
    }

    update() {
        this.checkinDate = this.container.querySelector('.js-datein').placeholder;
        this.checkoutDate = this.container.querySelector('.js-dateout').placeholder;
        this.calculationPreliminaryResult();
        this.calculationTotal();       
    }
}

let reservations = document.querySelectorAll('.js-container-reservation');

for (let block of reservations) {
    new Reservations(block);
}