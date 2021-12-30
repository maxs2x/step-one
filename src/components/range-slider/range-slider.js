class RangeSlider {
    constructor(slider) {
        this.container = slider;
        this.hoverLine = this.container.querySelector('.range-slider__line-for-hover');
        this.leftToggle = this.hoverLine.querySelector('.range-slider__left-point ');
        this.rightToggle = this.container.querySelector('.range-slider__right-point ');
        this.isResizingLeft = false;
        this.isResizingRightRight = false;
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
    }

    priceChange(event) {
        let clientX = event.clientX;
        let rangeToLeft = Number(this.hoverLine.style.left.slice(0, -2));
        let ofsetLeft = this.container.offsetLeft;
        let lastWidth = this.hoverLine.offsetWidth;
        if (this.isResizingLeft) {
            this.hoverLine.style.left = (clientX - ofsetLeft) + 'px';
            this.hoverLine.style.width = (lastWidth - (clientX - rangeToLeft - ofsetLeft)) + 'px';
        } else if (this.isResizingRight) {
            this.hoverLine.style.width = (clientX - rangeToLeft - ofsetLeft) + 'px';
        } else {
            return;
        };
    }
}

let allRangeSliders = document.querySelectorAll(".container-range-slider");
for (let slider of allRangeSliders) {
    new RangeSlider(slider);
}

