import './room-details.scss';

import '../../../components/header/header.js';
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import {CircleChart} from '../../../components/doughnut-diagram/doughnut-diagram.js';
import '../../../components/reservation/reservation.js';
import '../../../components/footer/footer.js';

let dataForCircleChart = {
    segmentThree: {
        segmentNumber: 1,
        startColor: '#FFE39C',
        stopColor: '#FFBA9C',
        countVoices: 130,
        title: 'Великолепно',
        description: 'Посетители оставившие отзыв "Великолепно"'
    },
    segmentTwo: {
        segmentNumber: 2,
        startColor: '#66D2EA',
        stopColor: '#6FCF97',
        countVoices: 65,
        title: 'Хорошо',
        description: 'Посетители оставившие отзыв "Хорошо"'
    },
    segmentOne: {
        segmentNumber: 3,
        startColor: '#8BA4F9',
        stopColor: '#BC9CFF',
        countVoices: 65,
        title: 'Удовлетворительно',
        description: 'Посетители оставившие отзыв "Удовлетворительно"'
    },
    segmentFour: {
        segmentNumber: 4,
        startColor: '#3D4975',
        stopColor: '#919191',
        countVoices: 0,
        title: 'Разочарован',
        description: 'Посетители оставившие отзыв "Разочарован"'
    }
}

let elementCircleChart = document.querySelectorAll('.js-doughnut-diagram-wrapper');

for (let elem of elementCircleChart) {
    new CircleChart(elem, dataForCircleChart)
}