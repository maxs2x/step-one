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
        this.svgPart = this.buildingSegment();
    }

    initialisationColor() {
        let gradient = '<linearGradient id="linearColors' + String(this.numberSegmen) + '" x1="0" y1="0" x2="0" y2="1"> <stop offset="0%" stop-color="' + this.startColor + '"></stop> <stop offset="100%" stop-color="' + this.stopColor + '"></stop></linearGradient>';
        return gradient;
    }

    initializationCircleSegment() {
        let circleSegment = '<circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="url(#linearColors' + String(this.numberSegmen) + ')" stroke-width="1" stroke-dasharray="' + this.startStrokeDasharray + ' ' + this.stopStrokeDasharray + '" stroke-dashoffset="' + this.strokeDashoffset + '" aria-labelledby="donut-segment-' + this.numberSegmen + '-title donut-segment-' + this.numberSegmen + '-desc"></circle>';
        return circleSegment;
    }

    initializationDescription() {
        let description = '<title id="donut-segment-' + String(this.numberSegmen) + '-title">' + this.title + '</title><desc id="donut-segment-' + String(this.numberSegmen) + '-desc">' + this.description + '</desc>'
        return description;
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
        this.filledPart = 0;
        this.allVoices = this.coutingAllVoices();
        this.insertAllPartsInSVG();
        
    }

    coutingAllVoices() {
        let voices = 0;
        console.log(this.dataAboutVoices.segmentOne.countVoices);
        for (let segment of Object.values(this.dataAboutVoices)) {
            voices += segment.countVoices;
        }
        return voices;
    }

    calculationStrokeDasharray(voices, segmentNumber) {
        let segmentShare = 100 * (voices / this.allVoices);
        let strokeDasharray = '';
        if (segmentNumber === 1) {
            strokeDasharray = {start:String(segmentShare - 2), stop: String(100 - segmentShare + 1)};
        } else {
            strokeDasharray = {start:String(segmentShare - 1), stop: String(100 - segmentShare)};
        }
        this.filledPart += segmentShare - 1;
        return strokeDasharray;
    }

    calculationStrokeDashoffset(segmentNumber) {
        let strokeDashoffset = 0;
        if (segmentNumber === 1) {
            strokeDashoffset = 24;
        } else {
            strokeDashoffset = 100 + 25 - this.filledPart - segmentNumber;
        } 
        return strokeDashoffset;
    }

    creatingAllCircleParts() {
        let oneSegment = '',
            allSegments = [];
        for (let segment of Object.values(this.dataAboutVoices)) {
            let colors = {start: segment.startColor, stop: segment.stopColor},
                strokeDashoffset = this.calculationStrokeDashoffset(segment.segmentNumber),
                strokeDasharray = this.calculationStrokeDasharray(segment.countVoices, segment.segmentNumber);
            console.log(strokeDasharray, strokeDashoffset); 
            oneSegment = new CircleSegment(segment.segmentNumber, colors, strokeDasharray, strokeDashoffset, segment.title, segment.description);
            allSegments.push(oneSegment);
        }
        return allSegments;
    }

    insertAllPartsInSVG() {
        let svgFigure = this.parent.querySelector('svg.donut'),
            allSegments = this.creatingAllCircleParts(),
            codeAllSegments = '';
        for (let codeOneSegment of allSegments) {
            codeAllSegments += codeOneSegment.svgPart;
        }
        svgFigure.insertAdjacentHTML("beforeend", codeAllSegments);
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