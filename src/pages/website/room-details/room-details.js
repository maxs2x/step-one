import './room-details.scss';

import '../../../components/header/header.js';
import '../../../components/reservation/reservation.js';
import '../../../components/footer/footer.js';


class CircleSegment {
    constructor(numberSegmen, color, strokeDasharray, strokeDashoffset, title, description) {
        this.numberSegmen = numberSegmen;
        this.startColor = color.start;
        this.stopColor = color.stop;
        this.startStrokeDasharray = strokeDasharray.start;
        this.stopStrokeDasharray = strokeDasharray.stop;
        this.strokeDashoffset = strokeDashoffset;
        this.title = title;
        this.description = description;
        this.buildingSegment();
    }

    initialisationColor() {
        let gradient = '<linearGradient id="linearColors' + String(this.numberSegmen) + '" x1="0" y1="0" x2="0" y2="1"> <stop offset="0%" stop-color="' + this.startColor + '"></stop> <stop offset="100%" stop-color="' + this.stopColor + '"></stop>';
        return gradient;
    }

    initializationCircleSegment() {
        let circleSegment = '<circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke=url(#linearColors' + this.numberSegmen + ')" stroke-width="1" stroke-dasharray="' + this.startStrokeDasharray + ' ' + this.stopStrokeDasharray + '" stroke-dashoffset="' + this.strokeDashoffset + '" aria-labelledby="donut-segment-' + this.numberSegmen + '-title donut-segment-' + this.numberSegmen + '-desc">';
        return circleSegment;
    }

    initializationDescription() {
        let description = '<title id="donut-segment-' + String(this.numberSegmen) + '-title">' + this.title + '</title><desc id="donut-segment-' + String(this.numberSegmen) + '-desc">' + this.description + '</desc>'
    }

    buildingSegment() {
        let linearGradient = this.initialisationColor(),
            circleSegment = this.initializationCircleSegment(),
            description = this.initializationDescription(),
            AcircleSegment = linearGradient + circleSegment + description;
        return AcircleSegment;
    }

}

class CircleChart {
    constructor(figure, dataAboutVoices) {
        this.parent = figure;
        this.dataAboutVoices = dataAboutVoices;
        this.countSegments = this.dataAboutVoices.length;
    }

    calculationStrokeDasharray(countVoices, ) {

    }

    creatingCircleParts() {
        let oneSegment = '',
            allSegments = '';
        for (let segment of this.dataAboutVoices) {
            let colors = {start: segment.startColor, stop: segment.startColor},
                strokeDasharray = '?',
                strokeDashoffset = '?',

            oneSegment = new CircleSegment(segment.segmentNumber, colors, strokeDasharray, strokeDashoffset, segment.title, segment.description);
            allSegments += oneSegment;
        }
    }
}


let dataForCircleChart = {segmentOne: {
        segmentNumber: 1,
        startColor: '#BC9CFF',
        stopColor: '#8BA4F9',
        countVoices: 65,
        title: 'Удовлетворительно',
        description: 'Посетители оставившие отзыв "Удовлетворительно"'
    },
    segmentTwo: {
        segmentNumber: 2,
        startColor: '#6FCF97',
        stopColor: '#66D2EA',
        countVoices: 65,
        title: 'Хорошо',
        description: 'Посетители оставившие отзыв "Хорошо"'
    },
    segmentThree: {
        segmentNumber: 3,
        startColor: '#FFE39C',
        stopColor: '#FFBA9C',
        countVoices: 130,
        title: 'Великолепно',
        description: 'Посетители оставившие отзыв "Великолепно"'
    }
}

let elementCircleChart = document.querySelectorAll('.figure-content');

for (let elem of elementCircleChart) {
    new CircleChart(elem, dataForCircleChart)
}