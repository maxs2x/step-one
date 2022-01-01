var objJson = [
    { adName: "1 - 12"},
    { adName: "12 - 24"},
    { adName: "24 - 36"},
    { adName: "36 - 48"},
    { adName: "48 - 60"},
    { adName: "60 - 72"},
    { adName: "72 - 84"},
    { adName: "84 - 96"},
    { adName: "96 - 108"},
    { adName: "108 - 120"},
    { adName: "120 - 132"},
    { adName: "132 - 144"},
    { adName: "144 - 156"},
    { adName: "156 - 168"},
    { adName: "168 - 180"}
]; // Can be obtained from another source, such as your objJson variable


class Pagination {
    constructor(pagination, pages) {
        this.container = pagination;
        this.contantPages = pages;
        this.numberOfPages = pages.length;
        this.prevPage = this.container.querySelector('.pagination__button-prev');
        this.thisPage = this.container.querySelector('.pagination__hover-page');
        this.nextPage = this.container.querySelector('.pagination__button-next');
        this.lastPage = this.container.querySelector('.pagintation__last-page');
        this.firstPage = this.container.querySelector('.pagintation__first-page');
        this.nextPage.onclick = this.handlerNextPage.bind(this);
        this.prevPage.onclick = this.handlerPrevPage.bind(this);
        this.lastPage.onclick = this.handlerLastPage.bind(this);
        this.alterableContent = this.container.querySelector('.pagination__count-from-to');
        this.setLastPage();
    }

    setLastPage() {
        this.lastPage.innerHTML = this.numberOfPages;
        if (this.numberOfPages < 4) {
            let nextFreePoint = this.lastPage.previousSibling;
            nextFreePoint.classList.add('pagination__invis-element');
        }
    }

    updatePagination(direction) {
        console.log('updatePagination ');
        if (direction === 'next') {
            let buttonForMoving = this.container.querySelectorAll('.pagination__page')[0];
            let nextNumberPage = Number(this.thisPage.innerHTML) + 1;
            if ((nextNumberPage + 1) === this.numberOfPages) {
                console.log(this.thisPage.nextSibling);
                this.thisPage.nextSibling.classList.add('pagination__invis-element');
            }
            if (nextNumberPage === this.numberOfPages) {
                this.lastPage.classList.add('pagination__invis-element');
            }
            if (nextNumberPage > this.numberOfPages) {
                this.nextPage.classList.add('pagination__invis-element');
                return
            }
            buttonForMoving.innerHTML = nextNumberPage;
            this.thisPage.insertAdjacentElement('afterend', buttonForMoving);
        } else if (direction === 'prev') {
            let buttonForMoving = this.container.querySelectorAll('.pagination__page')[2];
            let nextNumberPage = Number(this.thisPage.innerHTML) - 1;
            if ((nextNumberPage - 1) === 1) {
                this.thisPage.previousSibling.classList.add('pagination__invis-element');
            }
            if (nextNumberPage === 1) {
                this.firstPage.classList.add('pagination__invis-element');
            }
            if (nextNumberPage === 0) {
                this.prevPage.classList.add('pagination__invis-element');
                return
            }
            buttonForMoving.innerHTML = nextNumberPage;
            this.thisPage.insertAdjacentElement('beforebegin', buttonForMoving);
        }

    }

    recordingCahnges(contentPage) {
        this.alterableContent.innerHTML = contentPage.adName;
        console.log('recordingChanges ');
    }

    updatePrevButtons(numberPage) {
        switch (numberPage) {
            case 2:
                this.prevPage.classList.remove('pagination__invis-element');
                break;
            case 3:
                this.firstPage.classList.remove('pagination__invis-element');
                break;
            case 4:
                this.container.querySelectorAll('.pagination__three-point')[0].classList.remove('pagination__invis-element');
                break;
        }
    }

    updateNexttons(numberPage) {
        switch (numberPage) {
            case (this.numberOfPages - 1):
                this.nextPage.classList.remove('pagination__invis-element');
                break;
            case (this.numberOfPages - 2):
                this.lastPage.classList.remove('pagination__invis-element');
                break;
            case (this.numberOfPages - 3):
                this.container.querySelectorAll('.pagination__three-point')[1].classList.remove('pagination__invis-element');
                break;
        }
    }

    movingHover(numberPage) {
        console.log('movingHover ');
        let allElementsPages = this.container.querySelectorAll('.pagination__page');
        for (let page of allElementsPages) {
            if (Number(page.innerHTML) === numberPage) {
                this.thisPage.classList.remove('pagination__hover-page');
                page.classList.add('pagination__hover-page'); 
            };
        }
        this.thisPage = this.container.querySelector('.pagination__hover-page');
        if (!this.thisPage.previousSibling.classList.contains('pagination__page')) {
            this.updatePagination('prev');
        } else if (!this.thisPage.nextSibling.classList.contains('pagination__page')) {
            this.updatePagination('next');
        } 
    }

    handlerPrevPage() {
        console.log('displayPrevPage ');
        let thisPageNumber = Number(this.thisPage.innerHTML);
        let nextPageContent = this.contantPages[thisPageNumber - 2];
        this.recordingCahnges(nextPageContent);
        this.movingHover(thisPageNumber - 1);
        this.updateNexttons(thisPageNumber - 1);
    }

    handlerNextPage() {
        console.log('displayNextPage ');
        let thisPageNumber = Number(this.thisPage.innerHTML);
        let nextPageContent = this.contantPages[thisPageNumber];
        this.recordingCahnges(nextPageContent);
        this.movingHover(thisPageNumber + 1);
        this.updatePrevButtons(thisPageNumber + 1);
    }

    handlerLastPage() {
        console.log('displayLastPage ');
        let thisPageNumber = this.numberOfPages;
        let nextPageContent = this.contantPages[thisPageNumber - 1];
        this.recordingCahnges(nextPageContent);

    }
}

let containerPagination = document.querySelector('.pagination');

new Pagination(containerPagination, objJson);

