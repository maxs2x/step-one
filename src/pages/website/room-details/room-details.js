import './room-details.scss';

import '../../../components/header/header.js';
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";
import '../../../components/reservation/reservation.js';
import '../../../components/footer/footer.js';




class ChartSegment {
    constructor(startColor, stopColor, title, description) {
        this.startColor = startColor;
        this.stopColor = stopColor;
        this.title = title;
        this.description = description;
    }
}

class CircleChart {
    constructor(figure, dataAboutVoices) {
        this.parent = figure;
        this.dataAboutVoices = dataAboutVoices;
        this.segments = new Array();
        this.colors = new Array();
        this.filledPartChart = 0;
        this.allVoices = this.coutingAllVoices();
        this.insertHTMLFigure();
        this.insertCSSFigure();
        
    }

    coutingAllVoices() {
        let voices = 0;
        for (let segment of Object.values(this.dataAboutVoices)) {
            voices += segment.countVoices;
        }
        return voices;
    }

    calculationSegmentAngle(voices) {
        let segmentAngle = (voices / this.allVoices);
        return segmentAngle;
    }

    calculationStopSegment(startSegment, segmentAngle) {
        let endSegment = startSegment + segmentAngle;
        this.filledPartChart = endSegment;
        return endSegment;
    }

    creatingBackgroundForAllParts() {
        let background = '';      
        for (let segment of Object.values(this.dataAboutVoices)) {
            let startColor = segment.startColor,
                stopColor = segment.stopColor,
                startSegment = this.filledPartChart,
                segmentAngle = this.calculationSegmentAngle(segment.countVoices),
                stopSegment = this.calculationStopSegment(startSegment, segmentAngle),
                spaceBetweenSegments = '#fff ' + (stopSegment) + 'turn ' +  stopSegment + 'turn, ';
            background += startColor + ' ' + startSegment + 'rad ' + stopSegment + 'rad, ' + stopColor + ' ' + (stopSegment - 0.01) + 'turn, ' + spaceBetweenSegments;
            this.segments.push(new ChartSegment(startColor, stopColor, segment.title, segment.description));
        }
        background = 'conic-gradient(' + background.slice(0, -2) + ')';
        console.log('creatingAllCircleParts()');
        console.log(background);
        return background;
    }

    creatingTextForScreenReader() {
        let allText = '';  
        for (let segment of Object.values(this.dataAboutVoices)) {
            allText += segment.description + ' ' + segment.countVoices + '. ';
        }
        return allText;
    }

    creatingLegends() {
        let allTitles = '';  
        for (let segment of Object.values(this.dataAboutVoices)) {
            let title = '<span class="figure-key__shape-circle shape-' + segment.segmentNumber + '"></span>' + segment.title;
            allTitles += '<li><p>' + title + '</p></li>';
        }
        return allTitles;
    }

    creatingStyleForLegends() {
        let styleFigureKeyShapeCircle = `display: inline-block;
                width: 0.65rem;
                height: 0.65rem;
                margin-right: 0.32rem;
                margin-bottom: 0.18rem;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                transform: rotate(180deg);
            `;
        
        for (let item = 1; item < this.segments.length + 1; item++) {
            let nameElementLegend = '.shape-' + item,
                elementLegend = this.parent.querySelector(nameElementLegend);
                elementLegend.style.cssText = styleFigureKeyShapeCircle + `
                background: linear-gradient(180deg, ` + this.segments[item-1].startColor + ` 0%, ` + this.segments[item-1].stopColor + ` 100%);
                `;       
            console.log('creatingStyleForLegends()');
        }
    }

    insertHTMLFigure() {
        let doughnutDiagramm = '  <div class="doughnut-diagramm"><div class="doughnut-diagramm__inner-space"><div class="doughnut-diagramm__inner-text"><p><span class="doughnut-diagramm__counter">' + String(this.allVoices) + '</span> голосов </p></div></div></div>',
            legendTitles = this.creatingLegends(),
            legend = '<ul class="figure-key__list" aria-hidden="true" role="presentation">' + legendTitles + '</ul>',
            textForScreenReader = this.creatingTextForScreenReader(),
            figcaption = '<figcaption class="figure-key"><p class="screenreader-only"> Круговой график. ' + textForScreenReader + '</p>' + legend + '</figcaption> ',
            figure = '<figure>' + doughnutDiagramm + figcaption + '</figure>';    
            console.log('insertHTMLFigure');
        this.parent.insertAdjacentHTML("afterbegin", figure);
    }

    insertCSSFigure() {
        let elementForChart = this.parent.querySelector('.doughnut-diagramm'),
            styleContainer = `display: flex;
                justify-content: center;
                flex-direction: row;
                width: min-content;
                height: min-content;
                margin: 1.45rem 0rem;
            `,
            
            styleDoughnutDiagramm = `position: relative;
                width: 7.5rem;
                height: 7.47rem;
                margin-bottom: 0.2rem;
                padding: 0rem;
                border-radius: 50%;
                transform: scale(-1, 1);
            `,
            
            styleDoughnutDiagrammInnerSpace = `position: absolute;
                margin: 0px;
                padding: 0px;
                top: 3%;
                left: 3%;
                width: 94%;
                height: 94%;
                border-radius: 50%;
                background: #fff;
                display: flex;
                align-items: center;
                transform: scale(-1, 1);
            `,
            styleDoughnutDiagrammCounterP = `text-align: center;
            color: #BC9CFF;
            font-weight: 700;
            `,
            styleDoughnutDiagrammCounter = `display: block;
                font-size: 24px;
            `,
            styleFigureKey = `align-self: flex-end;
                margin-left: 1.73rem;
                padding-bottom: 0rem;
            `,
            styleFigureKeyList = `margin: 0;
                padding: 0;
                list-style: none;
              `,
            styleFigureKeyListLi = `
                display: flex;
                align-items: center;
                margin: 0rem 0.1rem 0rem;
                padding: 0;
                font-family: 'Montserrat', 'Quicksand', Arial, sans-serif;
                font-size: 14px;
            `,
            styleScreenreaderOnly = `position: absolute;
                width: 0.5rem;
                height: 0.5rem;
                margin: -1px;
                padding: 0;
                overflow: hidden;
                clip: rect(0,0,0,0);
                border: 0;
            `,
            styleDoughnutDiagrammInnerText = `
                width: 100%;
            `;

            this.parent.querySelector('figure').style.cssText = styleContainer;
            this.parent.querySelector('.doughnut-diagramm').style.cssText = styleDoughnutDiagramm;
            this.parent.querySelector('.doughnut-diagramm__inner-space').style.cssText = styleDoughnutDiagrammInnerSpace;
            this.parent.querySelector('.doughnut-diagramm__inner-text').style.cssText = styleDoughnutDiagrammInnerText;
            this.parent.querySelector('.doughnut-diagramm__counter').style.cssText = styleDoughnutDiagrammCounter;
            this.parent.querySelector('.doughnut-diagramm__inner-space p').style.cssText = styleDoughnutDiagrammCounterP;
            this.parent.querySelector('.figure-key').style.cssText = styleFigureKey;
            this.parent.querySelector('.figure-key__list').style.cssText = styleFigureKeyList;
            for (let elem of this.parent.querySelectorAll('.figure-key__list li p')) {
                elem.style.cssText = styleFigureKeyListLi;
            }
            this.parent.querySelector('.screenreader-only').style.cssText = styleScreenreaderOnly;
        
        
        console.log('insertCSSFigure');
        elementForChart.style.background = this.creatingBackgroundForAllParts();
        this.creatingStyleForLegends();

    }
}


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

let elementCircleChart = document.querySelectorAll('.js-doughnut-diagramm-wrapper');

for (let elem of elementCircleChart) {
    new CircleChart(elem, dataForCircleChart)
}