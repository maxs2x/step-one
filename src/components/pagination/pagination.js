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
        this.firstPage.onclick = this.handlerfirstPage.bind(this);
        this.thisPage.nextSibling.onclick = this.dubbleNext.bind(this);
        this.alterableContent = this.container.querySelector('.pagination__count-from-to');
        this.setLastPage();
        this.bindingEvent();
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
        console.log('updateNexttons')
        switch (numberPage) {
            case (this.numberOfPages - 1):
                // показать кнопку следующая страница
                this.nextPage.classList.remove('pagination__invis-element');
                break;
            case (this.numberOfPages - 2):
                // показать кнопку последняя страница
                this.lastPage.classList.remove('pagination__invis-element');
                break;
            case (this.numberOfPages - 3):
                // показать три точки спереди
                this.container.querySelectorAll('.pagination__three-point')[1].classList.remove('pagination__invis-element');
                break;
        }
    }

    movingHover(numberPage) {
        console.log('movingHover ');
        let allElementsPages = this.container.querySelectorAll('.pagination__page');
        //ищем элемент с нкжной страницей и переставляем на нее ховер
        for (let page of allElementsPages) {
            if (Number(page.innerHTML) === numberPage) {
                this.thisPage.classList.remove('pagination__hover-page');
                page.classList.add('pagination__hover-page'); 
            };
        }
        //обновляем выбранную страницу
        this.thisPage = this.container.querySelector('.pagination__hover-page');
        //скрываем ... или кнопки вперед/назад
        if (!this.thisPage.previousSibling.classList.contains('pagination__page')) {
            this.updatePagination('prev');
        } else if (!this.thisPage.nextSibling.classList.contains('pagination__page')) {
            this.updatePagination('next');
        } 
    }

    updatePaginationForLastPage() {
        let allPaginationPage = this.container.querySelectorAll('.pagination__page');
        allPaginationPage[0].remove();
        allPaginationPage[1].innerHTML = (this.numberOfPages - 2);
        let allTreePoint = this.container.querySelectorAll('.pagination__three-point');
        allTreePoint[0].insertAdjacentElement('afterend', allPaginationPage[1]);
        allTreePoint[1].classList.add('pagination__invis-element');
        let lastPage = '<div class="pagintation__last-page  pagination__invis-element">15</div>';
        this.thisPage.insertAdjacentHTML('afterend', lastPage);
        this.thisPage.insertAdjacentElement('afterend', allTreePoint[1]);
        this.lastPage = this.container.querySelector('.pagintation__last-page');
        this.lastPage.onclick = this.handlerLastPage.bind(this);
        // показываем кнопку назад если ее нет
        if (this.prevPage.classList.contains('pagination__invis-element')) {
            this.prevPage.classList.remove('pagination__invis-element');
        }
        // показываем первую страницу если ее нет
        if (this.firstPage.classList.contains('pagination__invis-element')) {
            this.firstPage.classList.remove('pagination__invis-element');
        }
        // показываем ... назад если их нет
        if (this.firstPage.nextSibling.classList.contains('pagination__invis-element')) {
            this.firstPage.nextSibling.classList.remove('pagination__invis-element');
        }
    }

    updatePaginationForFirstPage() {
        let paginationPages = this.container.querySelectorAll('.pagination__page');
        let counter = 1;
        for (let elem of paginationPages) {
            elem.innerHTML = counter;
            counter += 1;
            if (elem.classList.contains('pagination__hover-page')) {
                elem.classList.remove('pagination__hover-page');
            };
        }
        paginationPages[0].classList.add('pagination__hover-page');
        this.thisPage = paginationPages[0];
        // показываем кнопку вперед если ее нет
        if (this.nextPage.classList.contains('pagination__invis-element')) {
            this.nextPage.classList.remove('pagination__invis-element');
        }
        // показываем последнюю страницу если ее нет
        if (this.lastPage.classList.contains('pagination__invis-element')) {
            this.lastPage.classList.remove('pagination__invis-element');
        }
        // показываем ... вперед если их нет
        if (this.lastPage.previousSibling.classList.contains('pagination__invis-element')) {
            this.lastPage.previousSibling.classList.remove('pagination__invis-element');
        }
    }

    handlerPrevPage() {
        console.log('displayPrevPage ');
        let thisPageNumber = Number(this.thisPage.innerHTML);
        let nextPageContent = this.contantPages[thisPageNumber - 2];
        this.recordingCahnges(nextPageContent);
        this.movingHover(thisPageNumber - 1);
        this.updateNexttons(thisPageNumber - 1);
        this.bindingEvent();
    }

    dubblePrev() {
        this.handlerPrevPage();
        this.handlerPrevPage();
        this.bindingEvent();
    }

    handlerNextPage() {
        console.log('displayNextPage ');
        let thisPageNumber = Number(this.thisPage.innerHTML);
        let nextPageContent = this.contantPages[thisPageNumber];
        this.recordingCahnges(nextPageContent);
        this.movingHover(thisPageNumber + 1);
        this.updatePrevButtons(thisPageNumber + 1);
        this.bindingEvent();
    }

    dubbleNext() {
        this.handlerNextPage();
        this.handlerNextPage();
        this.bindingEvent();
    }

    handlerLastPage() {
        let thisPageNumber = this.numberOfPages;
        let nextPageContent = this.contantPages[thisPageNumber - 1];
        this.recordingCahnges(nextPageContent);
        let newLastPage = this.lastPage;
        newLastPage.classList.remove('pagintation__last-page');
        newLastPage.classList.add('pagination__page');
        this.movingHover(this.numberOfPages);
        this.updatePagination('next');
        this.updatePaginationForLastPage();
        this.bindingEvent();
    }

    handlerfirstPage() {
        this.recordingCahnges(this.contantPages[0]);
        this.firstPage.classList.add('pagination__invis-element');
        this.prevPage.classList.add('pagination__invis-element');
        this.container.querySelector('.pagination__three-point').classList.add('pagination__invis-element');
        this.updatePaginationForFirstPage();
        this.bindingEvent();

    }

    bindingEvent() {
        let allElementsPage = this.container.querySelectorAll('.pagination__page');
        if (allElementsPage[1].classList.contains('pagination__hover-page')) {
            allElementsPage[0].onclick = this.handlerPrevPage.bind(this);
            allElementsPage[2].onclick = this.handlerNextPage.bind(this);
            allElementsPage[1].onclick = () => ({chill:'chill'});
        } else if (allElementsPage[0].classList.contains('pagination__hover-page')) {
            allElementsPage[2].onclick = this.dubbleNext.bind(this);
            allElementsPage[1].onclick = this.handlerNextPage.bind(this);
            allElementsPage[0].onclick = () => ({chill:'chill'});
        } else if (allElementsPage[2].classList.contains('pagination__hover-page')) {
            allElementsPage[0].onclick = this.dubblePrev.bind(this);
            allElementsPage[1].onclick = this.handlerPrevPage.bind(this);
            allElementsPage[2].onclick = () => ({chill:'chill'});
        }
    }
}

let containerPagination = document.querySelector('.pagination');

new Pagination(containerPagination, objJson);

