class ImageSlider {
    constructor(container) {
        this.slider = container;
        this.slides = this.slider.querySelectorAll('.js-image-slider__photo-room');
        this.dots = this.slider.querySelectorAll('.js-image-slider__dot');
        this.nextButton = this.slider.querySelector('.js-image-slider__next')
        this.prevButton = this.slider.querySelector('.js-image-slider__prev');
        this.nextButton.onclick = this.plusSlides.bind(this);
        this.prevButton.onclick = this.currentSlide.bind(this);
        this.slideIndex = 0;
        this.showSlides(0);
        this.bindingDots();
    }
      
    showSlides(n) {
        if (n >= this.slides.length) {
            this.slideIndex = 0;
        } else if (n < 0) {
            this.slideIndex = this.slides.length - 1;
        } else {
            this.slideIndex = n;
        };

        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.display = "none";  
        }
        for (let i = 0; i < this.dots.length; i++) {  
            this.dots[i].className = this.dots[i].className.replace(" js-image-slider__dot_active", "");
        }

        this.slides[this.slideIndex].style.display = "block";  
        this.dots[this.slideIndex].className += " js-image-slider__dot_active";
    }

    plusSlides() {
        let n = this.slideIndex + 1;
        this.showSlides(n);
    }

    currentSlide() {
        let n = this.slideIndex - 1;
        this.showSlides(n);
    }

    dotClick(event) {
        let dotIndex = Number(event.currentTarget.getAttribute('data-index'));
        this.showSlides(dotIndex - 1);
    }

    bindingDots() {
        for (let dot of this.dots) {
            dot.onclick = this.dotClick.bind(this);
        }
    }
}

let allImageSliders = document.querySelectorAll('.js-image-slider');

for (let slider of allImageSliders) {
    new ImageSlider(slider);
}