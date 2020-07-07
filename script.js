window.onload = function () {
    callRequest();
    sliderNavigation();
    //pagesNavigation();
    gallaryNavigation();
    salesTabs();
}

function addSubTabs() {
    let allFlats = setInformationSales();
    let tabs = document.querySelectorAll('.sales .tab.level1');
    tabs.forEach(function (item, index) {
        let subtabs = item.nextElementSibling;

        if (subtabs && subtabs.classList.contains('subtabs')) {
            for (let i = 0; i < allFlats[index].length; i++) {
                let tab = document.createElement('div');
                tab.classList.add('tab');
                subtabs.insertAdjacentElement('beforeend', tab);
                isChecked = '';
                if (i == 0) {
                    isChecked = 'checked';
                }
                tab.insertAdjacentHTML('afterbegin', `<input ${isChecked} type="radio" id="tabSales${index}${i}" name="tab-sale${index}">
                <label for="tabSales${index}${i}" class="tab-title">${allFlats[index][i].totalSquare}</label>`);
            }
        }
    })
    fillSalesCard(allFlats);
}

function fillSalesCard(allFlats) {
    let flatInfo = document.querySelectorAll('.flatInfo');
    let subtabs = document.querySelectorAll('.subtabs');
    let imges = document.querySelectorAll('.flatTemplate');
    let elementIndex, arrIndex, column1, column2;
    subtabs.forEach(item => {
        item.addEventListener('click', function (e) {
            target = e.target.tagName == 'LABEL' ? e.target : null;
            if (target) {
                elementIndex = target.htmlFor.slice(-1);
                arrIndex = target.htmlFor.slice(-2, -1);
                flatTitle = `Квартира ${allFlats[arrIndex][elementIndex].totalSquare}`
                imges[arrIndex].src = allFlats[arrIndex][elementIndex].photo;
                flatInfo[arrIndex].children[0].innerHTML = flatTitle;
                column1 = flatInfo[arrIndex].children[1].children[0];
                column2 = flatInfo[arrIndex].children[1].children[1];
                column1.innerHTML = '';
                column2.innerHTML = '';
                addColumnItem('Будинок', allFlats[arrIndex][elementIndex].building, column1);
                addColumnItem('Поверх', allFlats[arrIndex][elementIndex].floor, column1);
                addColumnItem('Житлова площа', allFlats[arrIndex][elementIndex].liveSquare, column1);
                addColumnItem('Загальна площа', allFlats[arrIndex][elementIndex].totalSquare, column1);

                addColumnItem('Спальна', allFlats[arrIndex][elementIndex].bedroom, column2);
                addColumnItem('Кухня', allFlats[arrIndex][elementIndex].bathroom, column2);
                addColumnItem('Передпокій', allFlats[arrIndex][elementIndex].rest, column2);
                addColumnItem('Санвузол', allFlats[arrIndex][elementIndex].bathroom, column2);

            }
        })
    })
}

function addColumnItem(title, value, column) {
    /* <div class="column-item">
            <span class="column-item-title">Dom</span>
            <span class="column-item-value">235m2</span>
        </div> */
    let columnItem = document.createElement('div');
    columnItem.classList.add("column-item");
    columnItem.insertAdjacentHTML('afterBegin', `<span class="column-item-title">${title}</span>
                                                <span class="column-item-value">${value}</span>`);
    column.insertAdjacentElement('beforeEnd', columnItem);
}

function salesTabs() {
    addSubTabs();
    let tabs = document.querySelector('.sales .tabs');
    let subTabs = Array.from(document.querySelectorAll('.sales .subtabs'));
    tabs.addEventListener('click', function (e) {
        let tab = e.target.parentElement;
        if (e.target.classList.contains('level1')) {
            let checked = subTabs.find(item => item.classList.contains('checked'));
            if (checked) {
                checked.classList.remove('checked');
            }
            tab.nextElementSibling.classList.add('checked');
        }
    })
}

function callRequest() {
    let callAction = document.querySelectorAll('.call');
    let form = document.querySelector('.form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let elements = document.forms.call.elements;

        let user = {
            name: elements['name'].value,
            phone: elements['phone'].value,
        };

        elements['name'].value = '';
        elements['phone'].value = '';
    });

    callAction.forEach(item => {
        item.addEventListener('click', function () {
            form.style.display = 'block';
        })

        let close = form.querySelector('.close');
        close.addEventListener('click', function () {
            form.style.display = 'none';
        })
    })
}

function gallaryNavigation() {
    let navBar = document.querySelectorAll('.galary .navigation');
    let photosQuery = document.querySelectorAll('.photoes .photo-query');
    let display = document.querySelectorAll('.photo-display');
    tabNavigation("galary", 'clubHouse', photosQuery[0].children, display[0]);
    tabNavigation("galary", 'clubRes', photosQuery[1].children, display[1]);

    for (let index = 0; index < photosQuery.length; index++) {
        let arrImg = (Array.from(photosQuery[index].children));
        let navBars = Array.from(navBar[index].children).filter(item => item.tagName == 'LABEL');
        photosQuery[index].addEventListener('click', function (e) {
            let targetImgId = arrImg.findIndex(item => item == e.target);
            let checkedId = arrImg.findIndex(item => item.classList.contains('checked'));

            if (e.target.tagName === 'IMG') {
                display[index].style.backgroundImage = `url(${e.target.src})`;
                
                arrImg[targetImgId].classList.add('checked');
                arrImg[checkedId].classList.remove('checked');

                navBars[targetImgId].classList.add('checked');
                navBars[checkedId].classList.remove('checked');
            }
        })
    }
}

function tabNavigation(section, div, photosQuery, display) {
    let right = document.querySelector(`.${section} .${div}.navigation .right`);
    let left = document.querySelector(`.${section} .${div}.navigation .left`);
    let tabsWrapper = document.querySelector(`.${section} .tabs`);
    let tabs = tabsWrapper.children;
    let navigation = document.querySelector(`.${section} .navigation.${div}`);
    let navBar = Array.from(navigation.children).filter(item => item.tagName == 'LABEL');
    let photosQueryArr = Array.from(photosQuery);
    let photos = Array.from(document.querySelector('.photoes').children);
    let inputs = Array.from(tabs).map(item => {
        for (let i of item.children) {
            if (i.tagName = 'INPUT')
                return i;
        }
    });

    display.style.backgroundImage = `url(${photosQuery[0].src})`;

    tabsWrapper.addEventListener('click', function (e) {
         if (e.target == inputs[0]) {
             photos.forEach(element => element.style.display = 'none');
             photos[0].style.display = 'block';
         } else if (e.target == inputs[1]) {
             photos.forEach(element => element.style.display = 'none');
             photos[1].style.display = 'block';
         }
    });

    const displayCurrent = () => {
        let current = document.querySelector(`.${section} .current`);
        display.style.backgroundImage = `url(${current.src})`;
    }

    right.addEventListener('click', function (e) {
        let current = nextSlide('galary', navBar, photosQuery, photosQueryArr);
        current.classList.add('checked');
        displayCurrent();
    });

    left.addEventListener('click', function (e) {
        let current = prevSlide('galary', navBar, photosQuery, photosQueryArr);
        displayCurrent();
    });

    const callBack = (container,index) => {
       /* display.style.backgroundImage = `url(${container[index].src})`;
        container[index].classList.add('checked');*/
    }

    navigationBar(section,navBar,photosQuery,photosQueryArr,callBack);
 }

const prevSlide = (section, navBars, slides, slideArr) => {
    let current = document.querySelector(`.${section} .current`);
    current.classList.remove('current', 'next', 'prev', 'checked');
    let currentIndex = slideArr.indexOf(current);
    let indexPrev;
    if (currentIndex != 0) {
        indexPrev = currentIndex - 1;
    } else {
        indexPrev = slides.length - 1;
    }
    slides[indexPrev].classList.add('current');
    navBars[slideArr.indexOf(current)].classList.remove('checked');
    navBars[indexPrev].classList.add('checked');
    return slides[indexPrev];
};

const nextSlide = (section, navBars, slides, slideArr) => {
    let current = document.querySelector(`.${section} .current`);
    current.classList.remove('current', 'prev', 'next','checked');
    let currentIndex = slideArr.indexOf(current);
    let indexNext;
    if (currentIndex != slides.length - 1) {
        indexNext = currentIndex + 1;
    } else {
        indexNext = 0;
    }
    slides[indexNext].classList.add('current');
    navBars[currentIndex].classList.remove('checked');
    navBars[indexNext].classList.add('checked');
    return slides[indexNext];
};

const navigationBar = (section,navBars,container,containerArr,callBack) => {
    navBars.forEach((item, index) => {
        item.addEventListener('click', function () {
            let current = document.querySelector(`.${section} .current`);
            current.classList.remove('current', 'next', 'prev', 'checked');
            callBack(container,index);
            navBars[index].classList.add('checked');
            navBars[containerArr.indexOf(current)].classList.remove('checked');
        });
    })
}

function sliderNavigation() {
    const slider = document.querySelector('.slider');
    const navBars = slider.querySelectorAll('.navBar');
    const rightSlide = slider.querySelector('.navigation .right');
    const leftSlide = slider.querySelector('.navigation .left');
    let slides = slider.querySelectorAll('.slide');
    const slideArr = Array.from(slides);

    rightSlide.addEventListener('click', function (e) {
        let current = nextSlide('slider', navBars, slides, slideArr);
        if(slideArr.indexOf(current) === 0){
            current.classList.add('prev');
        }else{
            current.classList.add('next');
        }
    });

    leftSlide.addEventListener('click', function (e) {
        let current = nextSlide('slider', navBars, slides, slideArr);
        if(slideArr.indexOf(current) === slideArr.length-1){
            current.classList.add('next');
        }else{
            current.classList.add('prev');
        }
    });

    const navBarCallBack = (container,index) =>{
        if (index == 0) {
            container[index].classList.add('current', 'prev');
        } else {
            container[index].classList.add('current', 'next');
        }
    } 
    
    navigationBar(slider,navBars,slides,slideArr,navBarCallBack);
}

/*function pagesNavigation() {
    let pages = document.querySelectorAll('section');
    let rightNav = document.querySelector('nav .right');
    let leftNav = document.querySelector('nav .left');
    let navBar2 = document.querySelectorAll('nav .navBar');

    let pageNav = navigation(window, pages, rightNav, leftNav, navBar2, false, 'checkedNav');
}
*/
/*function navigation(slider, slides, right, left, navBar, dir, checkedClass, callBack) {
    let checked = Array.from(navBar).find((item) => item.classList.contains(checkedClass));
    let count = (100 / navBar.length);
    let checkedId = Array.from(navBar).indexOf(checked);


    slider.addEventListener('click', function (e) {
        let navBarCheck = Array.from(navBar).find(item => item === e.target);
        checked = Array.from(navBar).find(item => item.classList.contains(checkedClass));
        count = (100 / navBar.length);
        checkedId = Array.from(navBar).indexOf(checked);
        switch (e.target) {
            case right:
                let index = 0;
                if (dir) {
                    if (checkedId != navBar.length - 1) {
                        index = checkedId + 1;
                        callBack(slides, -count, index);
                    } else {
                        callBack(slides, 0, index);
                    }
                } else {
                    if (checkedId != navBar.length - 1) {
                        slider.scrollBy({
                            top: window.innerHeight,
                        })
                        index = checkedId + 1;
                    } else {
                        slider.scrollBy({
                            top: 0,
                        })
                    }
                }
                navBar[index].classList.add(checkedClass);
                checked.classList.remove(checkedClass);
                slides[checkedId].classList.remove('checked');
                break;
            case left:
                let index1 = checkedId - 1;
                if (dir) {
                    if (checkedId != 0) {
                        callBack(slides, 0, index1);
                    } else {
                        index1 = navBar.length - 1;
                        callBack(slides, -count, index1);
                    }
                } else {
                    if (checkedId != 0) {
                        slider.scrollBy({
                            top: -window.innerHeight,
                        })
                    } else {
                        slider.scrollBy({
                            bottom: 0,
                        })
                        index1 = navBar.length - 1;
                    }
                }
                navBar[index1].classList.add(checkedClass);
                checked.classList.remove(checkedClass);
                slides[checkedId].classList.remove('checked');
                break;
            case navBarCheck:
                let index2 = Array.from(navBar).indexOf(navBarCheck);
                if (dir) {
                    callBack(slides, -(count * index2), index2);
                } else {
                    slider.scrollTo({
                        top: (Array.from(navBar).indexOf(navBarCheck)) * window.innerHeight,
                        behavior: 'smooth'
                    })
                }
                navBarCheck.classList.add(checkedClass);
                checked.classList.remove(checkedClass);
                slides[checkedId].classList.remove('checked');
                break;
        }
    })
}*/

/*Imitation of Data Base*/
function setInformationSales() {
    let allFlats = [];
    let OneRoomFlats = [];
    OneRoomFlats.push({
        totalSquare: '36.05м2',
        rooms: 1,
        building: 15,
        floor: 4,
        liveSquare: '36.05м2',
        bedroom: '14.56м2',
        kitchen: '17.34м2',
        rest: '14.56м2',
        bathroom: '17.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '36.15м2',
        rooms: 1,
        building: 15,
        floor: 5,
        liveSquare: '36.15м2',
        bedroom: '12.56м2',
        kitchen: '17.34м2',
        rest: '15.56м2',
        bathroom: '18.4м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '36.25м2',
        rooms: 1,
        building: 10,
        floor: 4,
        liveSquare: '36.25м2',
        bedroom: '14.26м2',
        kitchen: '17.34м2',
        rest: '14.56м2',
        bathroom: '17.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '40.05м2',
        rooms: 1,
        building: 45,
        floor: 4,
        liveSquare: '40.05м2',
        bedroom: '15.56м2',
        kitchen: '16.34м2',
        rest: '17.56м2',
        bathroom: '17.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '40.25м2',
        rooms: 1,
        building: 7,
        floor: 6,
        liveSquare: '40.25м2',
        bedroom: '15.56м2',
        kitchen: '18.34м2',
        rest: '13.56м2',
        bathroom: '17.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '41.95м2',
        rooms: 1,
        building: 10,
        floor: 9,
        liveSquare: '36.05м2',
        bedroom: '14.96м2',
        kitchen: '17.34м2',
        rest: '19.56м2',
        bathroom: '15.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    });
    let TwoRoomFlats = [];
    TwoRoomFlats.push({
        totalSquare: '46.05м2',
        rooms: 2,
        building: 5,
        floor: 3,
        liveSquare: '46.05м2',
        bedroom: '14.56м2',
        kitchen: '17.34м2',
        rest: '14.56м2',
        bathroom: '17.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '46.15м2',
        rooms: 1,
        building: 15,
        floor: 5,
        liveSquare: '46.15м2',
        bedroom: '12.56м2',
        kitchen: '17.34м2',
        rest: '15.56м2',
        bathroom: '18.4м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '49.5м2',
        rooms: 1,
        building: 10,
        floor: 4,
        liveSquare: '49.5м2',
        bedroom: '14.26м2',
        kitchen: '17.34м2',
        rest: '14.56м2',
        bathroom: '17.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '20.25м2',
        rooms: 1,
        building: 45,
        floor: 4,
        liveSquare: '50.25м2',
        bedroom: '15.56м2',
        kitchen: '16.34м2',
        rest: '17.56м2',
        bathroom: '17.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '52.25м2',
        rooms: 1,
        building: 7,
        floor: 6,
        liveSquare: '52.25м2',
        bedroom: '15.56м2',
        kitchen: '18.34м2',
        rest: '13.56м2',
        bathroom: '17.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '54.95м2',
        rooms: 1,
        building: 10,
        floor: 9,
        liveSquare: '54.05м2',
        bedroom: '14.96м2',
        kitchen: '17.34м2',
        rest: '19.56м2',
        bathroom: '15.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    });
    let ThreeRoomFlats = [];
    ThreeRoomFlats.push({
        totalSquare: '56.05м2',
        rooms: 2,
        building: 5,
        floor: 3,
        liveSquare: '56.05м2',
        bedroom: '14.56м2',
        kitchen: '17.34м2',
        rest: '14.56м2',
        bathroom: '17.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '57.15м2',
        rooms: 1,
        building: 15,
        floor: 5,
        liveSquare: '57.15м2',
        bedroom: '12.56м2',
        kitchen: '17.34м2',
        rest: '15.56м2',
        bathroom: '18.4м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '59.5м2',
        rooms: 1,
        building: 10,
        floor: 4,
        liveSquare: '59.5м2',
        bedroom: '14.26м2',
        kitchen: '17.34м2',
        rest: '14.56м2',
        bathroom: '17.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    }, {
        totalSquare: '60.25м2',
        rooms: 1,
        building: 45,
        floor: 4,
        liveSquare: '60.25м2',
        bedroom: '15.56м2',
        kitchen: '16.34м2',
        rest: '17.56м2',
        bathroom: '17.34м2',
        photo: './svg/flatTemplates/flat13605m2.png'
    });
    allFlats.push(OneRoomFlats, TwoRoomFlats, ThreeRoomFlats);
    return allFlats;
}