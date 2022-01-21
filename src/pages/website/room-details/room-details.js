import './room-details.scss';

import '../../../components/header/header.js';
import '../../../components/reservation/reservation.js';
import '../../../components/footer/footer.js';

class CircleChart {
    constructor(figure, dataAboutVoices) {
        this.parent = figure;
        this.dataAboutVoices = dataAboutVoices;
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
            this.colors.push(startColor);
        }
        background = 'conic-gradient(' + background.slice(0, -2) + ')';
        console.log('creatingAllCircleParts()');
        console.log(background);
        return background;
    }

    creatingLegends() {
        let allTitles = '';  
        for (let segment of Object.values(this.dataAboutVoices)) {
            let title = '<span class="figure-key__shape-circle shape-' + segment.segmentNumber + '">' + segment.title + '</span>';
            allTitles += '<li>' + title + '</li>';
        }
        return allTitles;
    }

    creatingStyleForLegends() {
        let backgroundElement = 'linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);';
        
        for (let item of this.colors) {
            let nameElementLegend = '.shape-' + 1,
                elementLegend = this.parent.querySelector(nameElementLegend);
            console.log('creatingStyleForLegends()');
            console.log(item);
        }
        this.colors.forEach(alert);
        console.log(this.colors);
    }

    insertHTMLFigure() {
        let doughnutDiagramm = '  <div class="doughnut-diagramm"><div class="doughnut-diagramm__inner-space"><div class="doughnut-diagramm__inner-text"><p> всего человек</p></div></div></div>',
            legendTitles = this.creatingLegends(),
            legend = '<ul class="figure-key__list" aria-hidden="true" role="presentation">' + legendTitles + '</ul>',
            figcaption = '<figcaption class="figure-key"><p class="screenreader-only"> Круговой график с отзывами. Великолепно 65 отзывов. Хорошо 65 отзывов.</p>' + legend + '</figcaption> ',
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
                margin: 0.45rem 0rem;
            `,
            
            styleDoughnutDiagramm = `position: relative;
                width: 9.5rem;
                height: 9.5rem;
                padding: 0rem;
                border-radius: 50%;
            `,
            
            styleDoughnutDiagrammInnerSpace = `position: absolute;
                margin: 0px;
                padding: 0px;
                top: 5%;
                left: 5%;
                width: 90%;
                height: 90%;
                border-radius: 50%;
                background: #fff;
            `,
            styleFigureKey = `align-self: flex-end;
                margin-left: 0.8rem;
                padding-bottom: 1.0rem;
            `,
            styleFigureKeyList = `margin: 0;
                padding: 0;
                list-style: none;
              `,
              styleFigureKeyListLi = `
                display: flex;
                align-items: center;
                margin: 0.4rem 0rem 0rem;
                padding: 0;
            `,
            styleFigureKeyShapeCircle = `display: inline-block;
                vertical-align: middle;
                width: 0.65rem;
                height: 0.65rem;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
            `,

            styleScreenreaderOnly = `position: absolute;
                width: 0.5rem;
                height: 0.5rem;
                margin: -1px;
                padding: 0;
                overflow: hidden;
                clip: rect(0,0,0,0);
                border: 0;
            `;

            this.parent.querySelector('figure').style.cssText = styleContainer;
            this.parent.querySelector('.doughnut-diagramm').style.cssText = styleDoughnutDiagramm;
            this.parent.querySelector('.doughnut-diagramm__inner-space').style.cssText = styleDoughnutDiagrammInnerSpace;
            this.parent.querySelector('.figure-key').style.cssText = styleFigureKey;
            this.parent.querySelector('.figure-key__list').style.cssText = styleFigureKeyList;
            this.parent.querySelector('.figure-key__list li').style.cssText = styleFigureKeyListLi;
            this.parent.querySelector('.figure-key__shape-circle').style.cssText = styleFigureKeyShapeCircle;
            this.parent.querySelector('.screenreader-only').style.cssText = styleScreenreaderOnly;
        
        this.creatingStyleForLegends();
        console.log('insertCSSFigure');
        elementForChart.style.background = this.creatingBackgroundForAllParts();

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
        startColor: '#FFBA9C',
        stopColor: '#FFE39C',
        countVoices: 130,
        title: 'Великолепно',
        description: 'Посетители оставившие отзыв "Великолепно"'
    },
    segmentFour: {
        segmentNumber: 4,
        startColor: '#919191',
        stopColor: '#3D4975',
        countVoices: 0,
        title: 'Разочарован',
        description: 'Посетители оставившие отзыв "Разочарован"'
    }
}

let elementCircleChart = document.querySelectorAll('.js-doughnut-diagramm-wrapper');

for (let elem of elementCircleChart) {
    new CircleChart(elem, dataForCircleChart)
}