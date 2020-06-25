window.onload = function () {
    callRequest();
    sliderNavigation();
    pagesNavigation();
    gallaryNavigation();
    salesTabs();
}

function salesTabs(){
    let tabs = document.querySelector('.sales .tabs');
    let subTabs = Array.from(document.querySelectorAll('.sales .subtabs'));
    tabs.addEventListener('click',function(e){
        let tab = e.target.parentElement;
        if(e.target.classList.contains('level1')){
            let checked = subTabs.find(item=>item.classList.contains('checked'));
            if(checked){
                checked.classList.remove('checked');
            }
            tab.nextElementSibling.classList.add('checked');
        }
    })
}

function callRequest(){
    let phoneAction = document.querySelectorAll('.phone-action');
    let form = document.querySelector('.form');
    form.addEventListener('submit',function(e){
        e.preventDefault();

        let elements = document.forms.call.elements;

        let user = {
            name:elements['name'].value,
            phone:elements['phone'].value,
        };

        elements['name'].value = '';
        elements['phone'].value = '';
    });

    phoneAction.forEach(item=>{
        item.addEventListener('click',function(){
            form.style.display='block';
        })

        let close = form.querySelector('.close');
        close.addEventListener('click',function(){
            form.style.display='none';       
        })
    })
} 

function gallaryNavigation() {
    let navBar = document.querySelectorAll('.galary .navigation');
    let photosQuery = document.querySelectorAll('.photoes .photo-query');
    let display = document.querySelectorAll('.photo-display');
    tabNavigation("galary", 'clubHouse', photosQuery[0].children, display[0]);
    tabNavigation("galary", 'clubRes', photosQuery[1].children, display[1]);

    for(let index=0; index<photosQuery.length;index++){
        let arrImg=(Array.from(photosQuery[index].children));
        let navBars = Array.from(navBar[index].children).filter(item=> item.tagName=='LABEL');
        photosQuery[index].addEventListener('click',function(e){
            let targetImgId = arrImg.findIndex(item=> item==e.target);
            let checkedId = arrImg.findIndex(item=> item.classList.contains('checked'));
        
            if(e.target.tagName === 'IMG'){
                display[index].style.backgroundImage = `url(${e.target.src})`;
                arrImg[targetImgId].classList.add('checked');
                arrImg[checkedId].classList.remove('checked');
                navBars[targetImgId].classList.add('galaryChecked');
                navBars[checkedId].classList.remove('galaryChecked');
            }
        })
    }
}

function tabNavigation(section, div, photosQuery, display) {

    let right = document.querySelector(`.${section} .${div}.navigation .right`);
    let left = document.querySelector(`.${section} .${div}.navigation .left`);
    let tabsWrapper = document.querySelector(`.${section} .tabs`);
    let tabs = tabsWrapper.children;
    let navigationW = document.querySelector(`.${section} .navigation.${div}`);
    let navBar = Array.from(navigationW.children).filter(item=> item.tagName=='LABEL');

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
    })

    const callBack = function (slides, count, checkedId) {
        display.style.backgroundImage = `url(${slides[checkedId].src})`;
        slides[checkedId].classList.add('checked');
    }

    navigation(navigationW, photosQuery, right, left, navBar, true, 'galaryChecked', callBack);
}

function sliderNavigation() {
    let slider = document.querySelector('.slider');
    let slides = document.querySelectorAll('.slide');
    let rightSlide = document.querySelector('.slider .navigation .right');
    let leftSlide = document.querySelector('.slider .navigation .left');
    let navBar1 = document.querySelectorAll('.slider .navBar');

    const callBack = function (slides, count, checkedId) {
        slides[0].style.marginLeft = `${count}%`;
    }
    let sliderNav = navigation(slider, slides, rightSlide, leftSlide, navBar1, true, 'checked', callBack);
}

function pagesNavigation() {
    let pages = document.querySelectorAll('section');
    let rightNav = document.querySelector('nav .right');
    let leftNav = document.querySelector('nav .left');
    let navBar2 = document.querySelectorAll('nav .navBar');

    let pageNav = navigation(window, pages, rightNav, leftNav, navBar2, false, 'checkedNav');
}



function navigation(slider, slides, right, left, navBar, dir, checkedClass, callBack) {
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
}