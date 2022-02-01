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
        this.isResizingRightRight = false;
        this.leftToggle.onmousedown = this.startResizingLeft.bind(this);
        this.rightToggle.onmousedown = this.startResizingRight.bind(this);
        document.onmouseup = this.stopResizing.bind(this);
        document.onmousemove = this.priceChange.bind(this);       
    }

    startResizingLeft() {
        this.isResizingLeft = true;
    }

    startResizingRight() {
        this.isResizingRight = true;
    }

    stopResizing() {   
        this.isResizingLeft = false;
        this.isResizingRight = false;
    }

    priceChange(event) {
        let clientX = event.clientX;
        let rangeToLeft = Number(this.hoverLine.style.left.slice(0, -2));
        let ofsetLeft = this.container.offsetLeft;
        let lastWidth = this.hoverLine.offsetWidth;

        let rangeNull = new Range(0, 20);
        let rangeOne = new Range(20, 40);
        let rangeTwo = new Range(45, 70);
        let rangeThree = new Range(70, 90);
        let rangeFour = new Range(90, 100);

        let pointPositionPercent = 0

        if ((this.isResizingLeft) && (clientX > ofsetLeft) && (clientX < (ofsetLeft + rangeToLeft + lastWidth - 40))) {
            this.hoverLine.style.left = (clientX - ofsetLeft) + 'px';
            this.hoverLine.style.width = (lastWidth - (clientX - rangeToLeft - ofsetLeft)) + 'px';
            
            pointPositionPercent = ((clientX - ofsetLeft) / this.container.offsetWidth) * 100;
            
            let rightPartPlaceholder = this.placeHolder.innerHTML.split('-')[1];
            
            if (rangeNull.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = '0₽ -' + rightPartPlaceholder;
            } else if (rangeOne.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = '5000₽ -' + rightPartPlaceholder;
            } else if (rangeTwo.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = '10000₽ -' + rightPartPlaceholder;
            } else if (rangeThree.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = '15000₽ -' + rightPartPlaceholder;
            } else if (rangeFour.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = '20000₽ -' + rightPartPlaceholder;
            };

        } else if ((this.isResizingRight) && ((ofsetLeft + this.container.offsetWidth) > clientX) && (clientX > (ofsetLeft + rangeToLeft + 40))) {
            this.hoverLine.style.width = (clientX - rangeToLeft - ofsetLeft) + 'px';
        
            pointPositionPercent = ((clientX - ofsetLeft) / this.container.offsetWidth) * 100;
        
            let leftPartPlaceholder = this.placeHolder.innerHTML.split('-')[0];
            
            if (rangeNull.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = leftPartPlaceholder + '- 0₽';
            } else if (rangeOne.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = leftPartPlaceholder + '- 5000₽';
            } else if (rangeTwo.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = leftPartPlaceholder + '- 10000₽';
            } else if (rangeThree.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = leftPartPlaceholder + '- 15000₽';
            } else if (rangeFour.has(pointPositionPercent)) {
                this.placeHolder.innerHTML = leftPartPlaceholder + '- 20000₽';
            };
        } else {
            return;
        };
    }
}

let allRangeSliders = document.querySelectorAll(".js-range-slider");
for (let slider of allRangeSliders) {
    new RangeSlider(slider);
}

