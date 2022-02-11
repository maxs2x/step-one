export class ChartSegment {
    constructor(startColor, stopColor, title, description) {
        this.startColor = startColor;
        this.stopColor = stopColor;
        this.title = title;
        this.description = description;
    }
}

export class CircleChart {
    constructor(figure, dataAboutVoices) {
        this.parent = figure;
        this.dataAboutVoices = dataAboutVoices;
        this.segments = new Array();
        this.colors = new Array();
        this.filledPartChart = 0;
        this.allVoices = this.countingAllVoices();
        this.insertHTMLFigure();
        this.insertCSSFigure();
        
    }

    countingAllVoices() {
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
                margin-right: 0.3125rem;
                margin-bottom: 0.125rem;
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
        }
    }

    insertHTMLFigure() {
        let doughnutDiagram = '  <div class="doughnut-diagram"><div class="doughnut-diagram__inner-space"><div class="doughnut-diagram__inner-text"><p><span class="doughnut-diagram__counter">' + String(this.allVoices) + '</span> голосов </p></div></div></div>',
            legendTitles = this.creatingLegends(),
            legend = '<ul class="figure-key__list" aria-hidden="true" role="presentation">' + legendTitles + '</ul>',
            textForScreenReader = this.creatingTextForScreenReader(),
            figcaption = '<figcaption class="figure-key"><p class="screenreader-only"> Круговой график. ' + textForScreenReader + '</p>' + legend + '</figcaption> ',
            figure = '<figure>' + doughnutDiagram + figcaption + '</figure>';    
        this.parent.insertAdjacentHTML("afterbegin", figure);
    }

    insertCSSFigure() {
        let elementForChart = this.parent.querySelector('.doughnut-diagram'),
            styleContainer = `
                display: flex;
                justify-content: center;
                flex-flow: row wrap;
                width: 100%;
                height: min-content;
                margin: 0rem;
            `,
            
            styleDoughnutDiagram = `
                position: relative;
                width: 7.5rem;
                height: 7.5rem;
                margin-bottom: 0.1875rem;
                padding: 0rem;
                border-radius: 50%;
                transform: scale(-1, 1);
            `,
            
            styleDoughnutDiagramInnerSpace = `
                position: absolute;
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
            styleDoughnutDiagramCounterP = `
                margin-top: 0.9375rem;
                text-align: center;
                color: #BC9CFF;
                font-weight: 700;
                letter-spacing: 0.03rem;
                line-height: 1.4rem;
            `,
            styleDoughnutDiagramCounter = `
                display: block;
                font-size: 24px;
            `,
            styleFigureKey = `
                align-self: flex-end;
                margin-left: 1.75rem;
                padding-bottom: 0rem;
            `,
            styleFigureKeyList = `
                margin: 0;
                padding: 0rem 0rem 0.25rem 0rem;
                list-style: none;
              `,
            styleFigureKeyListLi = `
                display: flex;
                align-items: center;
                margin: 0.375rem 0.125rem 0rem;
                padding: 0;
                font-family: 'Montserrat', 'Quicksand', Arial, sans-serif;
                font-size: 14px;
            `,
            styleScreenreaderOnly = `
                position: absolute;
                width: 0.5rem;
                height: 0.5rem;
                margin: -1px;
                padding: 0;
                overflow: hidden;
                clip: rect(0,0,0,0);
                border: 0;
            `,
            styleDoughnutDiagramInnerText = `
                width: 100%;
            `;

            this.parent.querySelector('figure').style.cssText = styleContainer;
            this.parent.querySelector('.doughnut-diagram').style.cssText = styleDoughnutDiagram;
            this.parent.querySelector('.doughnut-diagram__inner-space').style.cssText = styleDoughnutDiagramInnerSpace;
            this.parent.querySelector('.doughnut-diagram__inner-text').style.cssText = styleDoughnutDiagramInnerText;
            this.parent.querySelector('.doughnut-diagram__counter').style.cssText = styleDoughnutDiagramCounter;
            this.parent.querySelector('.doughnut-diagram__inner-space p').style.cssText = styleDoughnutDiagramCounterP;
            this.parent.querySelector('.figure-key').style.cssText = styleFigureKey;
            this.parent.querySelector('.figure-key__list').style.cssText = styleFigureKeyList;
            for (let elem of this.parent.querySelectorAll('.figure-key__list li p')) {
                elem.style.cssText = styleFigureKeyListLi;
            }
            this.parent.querySelector('.screenreader-only').style.cssText = styleScreenreaderOnly;
        
        elementForChart.style.background = this.creatingBackgroundForAllParts();
        this.creatingStyleForLegends();

    }
}

