class PointSlider {
    constructor(point) {
        this._point = point;

    }
}

function Range(begin, end) {
    this.low = begin;
    this.hi = end;
    this.has = function(n) {
       return (this.low <= n) && (n <= this.hi);
    }
}

class RangeSlider {
    constructor(slider) {
        this.container = slider;
        this.hoverLine = this.container.querySelector('.js-range-slider__line-for-hover');
        this.leftToggle = this.hoverLine.querySelector('.js-range-slider__left-point');
        this.rightToggle = this.container.querySelector('.js-range-slider__right-point');
        this.placeHolder = this.container.querySelector('.js-range-slider__interval');
        this.isResizingLeft = false;
        this.isResizingRight = false;
        this.leftToggle.onmousedown = this.startResizingLeft.bind(this);
        this.rightToggle.onmousedown = this.startResizingRight.bind(this);
        document.onmouseup = this.stopResizing.bind(this);
        document.onmousemove = this.priceChange.bind(this);      
    }

    startResizingLeft() {
        this.isResizingLeft = true;
        console.log(this.isResizingLeft);
    }

    startResizingRight() {
        this.isResizingRight = true;
        console.log(this.isResizingRight);
    }

    stopResizing() {   
        this.isResizingLeft = false;
        this.isResizingRight = false;
        console.log("stopResizing()");
    }

    priceChange(event) {
        let cursorPosition = event.clientX,
            rangeToLeft = Number(this.hoverLine.style.left.slice(0, -2)),
            offsetLeft = this.container.getBoundingClientRect(),
            lastWidth = this.hoverLine.offsetWidth,
            positionLeftPoint = this.leftToggle.getBoundingClientRect(),
            positionRightPoint = this.rightToggle.getBoundingClientRect();
     
        let rangeNull = new Range(0, 20);
        let rangeOne = new Range(20, 40);
        let rangeTwo = new Range(45, 70);
        let rangeThree = new Range(70, 90);
        let rangeFour = new Range(90, 100);

        let pointPositionPercent = 0

        if ((this.isResizingLeft) && (0 < (cursorPosition - offsetLeft.x)) && (positionLeftPoint.right < positionRightPoint.left) && (lastWidth >= 50)) {
            this.hoverLine.style.left = (cursorPosition - offsetLeft.x) + 'px';
            this.hoverLine.style.width = (lastWidth - (cursorPosition - positionLeftPoint.x)) + 'px';            

            pointPositionPercent = ((cursorPosition - offsetLeft.x) / this.container.offsetWidth) * 100;
            
            let rightPartPlaceholder = this.placeHolder.innerHTML.split('-')[1];
            
            if (rangeNull.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = '0₽ -' + rightPartPlaceholder;
            } else if (rangeOne.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = '5 000₽ -' + rightPartPlaceholder;
            } else if (rangeTwo.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = '10 000₽ -' + rightPartPlaceholder;
            } else if (rangeThree.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = '15 000₽ -' + rightPartPlaceholder;
            } else if (rangeFour.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = '20 000₽ -' + rightPartPlaceholder;
            };

        } else if ((this.isResizingRight) && ((offsetLeft.right - 10) > cursorPosition) && (positionLeftPoint.right < positionRightPoint.left) && (lastWidth > 50)) {
            this.hoverLine.style.width = (lastWidth + (cursorPosition - positionRightPoint.x)) + 'px';
        
            pointPositionPercent = ((cursorPosition - offsetLeft.x) / this.container.offsetWidth) * 100;
        
            let leftPartPlaceholder = this.placeHolder.innerHTML.split('-')[0];
            
            if (rangeNull.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = leftPartPlaceholder + '- 0₽';
            } else if (rangeOne.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = leftPartPlaceholder + '- 5 000₽';
            } else if (rangeTwo.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = leftPartPlaceholder + '- 10 000₽';
            } else if (rangeThree.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = leftPartPlaceholder + '- 15 000₽';
            } else if (rangeFour.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = leftPartPlaceholder + '- 20 000₽';
            };
        } else {
            return;
        };

        if (this.hoverLine.offsetWidth <= 50) {
            this.hoverLine.style.width = '53px';
            this.stopResizing();
        };
    }
}

let allRangeSliders = document.querySelectorAll(".js-range-slider");
for (let slider of allRangeSliders) {
    new RangeSlider(slider);
}

