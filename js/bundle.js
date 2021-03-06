/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    
    const d = document;
     //calculator

    const genderFields = d.querySelector('#gender').querySelectorAll('.calculating__choose-item'),
          constitutionFields = d.querySelector('.calculating__choose_medium').querySelectorAll('.calculating__choose-item'),
          activityFields = d.querySelector('.calculating__choose_big').querySelectorAll('.calculating__choose-item'),
          result = d.querySelector('.calculating__result').firstChild.nextSibling;

    class Calculator{
        constructor(gender, height, weight, age, activity){
            this.gender = gender;
            this.height = height;
            this.weight = weight;
            this.age = age;
            this.activity = activity;
            this.calculateCallories();
        }

        calculateCallories(){
            let res = 0;
            if (this.height && this.weight && this.age){
                if (this.gender == 'male'){
                    res = 88.36 + (13.4 * this.weight) + (4.8 * this.height) - (5.7 * this.age);
                }
                else if (this.gender == 'female'){
                    res = 447.6 + (9.2 * this.weight) + (3.1 * this.height) - (4.3 * this.age);
                }
                switch (this.activity){
                    case 'low': res *= 1.2; break;
                    case 'small': res *= 1.375; break;
                    case 'medium': res *= 1.55; break;
                    case 'high': res *= 1.725; break;
                }
            }
            result.textContent = `${Math.round(res)}`;
            return Math.round(res);
        }

        setActiveField(f){
            f.parentNode.querySelectorAll('div').forEach(field => {
                field.classList.remove('calculating__choose-item_active');
            });
            f.classList.add('calculating__choose-item_active');
        }

        setGender(g){
            this.gender = g.id;
            this.setActiveField(g);
            this.calculateCallories();
        }

        setActivity(a){
            this.activity = a.id;
            this.setActiveField(a);
            this.calculateCallories();
        }

        setParams([height, weight, age]){
            this.height = +height.value;
            this.weight = +weight.value;
            this.age = +age.value;
            this.calculateCallories();
        }
        
    }


    //?????????????????????????? ?????????????????? ???????????????? ?? ??????????????????. ?????????????????? ?????????????????? ???????????? ????????????????????.

    const calc = new Calculator('female', null, null, null, 'low');

    //???????????????????? ?????????? ???????????????????? ???? ??????????. ?????????????????? ?????????????? ??????????????????.

    genderFields.forEach(field => {
        field.addEventListener('click', () => {
            calc.setGender(field);
        });
    });

    activityFields.forEach(field => {
        field.addEventListener('click', () => {
            calc.setActivity(field);
        });
    });

    constitutionFields.forEach(field => {
        field.addEventListener('input', () => {
            if (field.value.match(/\D/g)){
                field.style.border = '1px solid red';
                console.log(field);
            }
            else{
                field.style.border = 'none';
                console.log(field);
                calc.setParams(constitutionFields);
            }
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function cards(){
    const d = document;
     //???????????????????? ???????????? ?????? ????????????????

     class MenuCard{
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.classes = classes;
            this.parent = d.querySelector(parentSelector);
            this.convertToUAH();
        }

        convertToUAH() {
            this.price = this.price * this.transfer;
        }

        render(){
            const element = d.createElement('div');
            if (this.classes.length !== 0){
                this.classes.forEach(className => element.classList.add(className));
            }
            else{
                this.element = 'menu__item';
                element.classList.add('menu__item');
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.de}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">????????:</div>
                    <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                </div>
            `;
            this.parent.append(element);
        }
    }


    //getResourses() without axios
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourses)('http://localhost:3000/menu').
    then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });

// axios.get('http://localhost:3000/menu')
// .then(data => {
//         data.data.forEach(({img, altimg, title, descr, price}) => {
//         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
//     });
// });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/modal */ "./js/modules/modal.js");



function forms(formsSelector, modalDialogSelector, modalSelector){
    const d = document;
    //forms
    const forms = d.querySelectorAll(formsSelector);
    const message = {
        loading : '???????? ????????????????, ????????????????????, ??????????????????',
        success : '???????????? ????????????????',
        failure : '??????-???? ?????????? ???? ??????'
    };
    



    function showThankyouModal(message){
        const prevModalDialog = d.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)();//?????????????????? ?????? ?????????????????? ????????

        const thankyouModal = d.createElement('div');
        thankyouModal.classList.add(modalDialogSelector);
        thankyouModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>??</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        thankyouModal.classList.add('fade');
        d.querySelector().append(thankyouModal);
        // ???????????????? ?????? ?????????????????? ?????????????? ?????????????? ?????????? ?????????????????????? ???????????? ?? ????????????????????
        setTimeout(()=>{
            thankyouModal.remove(modalSelector);
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closeModal();
        }, 4000);
    } 




    function bingPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                // console.log(data);
                showThankyouModal(message.success);
            })
            .catch(() => {
                showThankyouModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });
        });
    }
    
    forms.forEach(item => {
        // console.log(item);
        bingPostData(item);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
const d = document;

function openModal(modalSelector, modalTimerId){
    const modalWindow = d.querySelector(modalSelector);
    modalWindow.classList.add('show', 'fade');
    d.body.style.overflow = 'hidden';
    if (modalTimerId){
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector){
    const modalWindow = d.querySelector(modalSelector);
    modalWindow.classList.remove('show', 'fade');
    d.body.style.overflow = 'auto';
}

function modal(triggerSelector, modalSelector){

     //modal window

    const modalTrigger = d.querySelectorAll(triggerSelector),
          modalWindow = d.querySelector(modalSelector);




    modalTrigger.forEach(item => {
        item.addEventListener('click', (e) => {
            openModal(modalSelector, modalTimerId);
        });
    });


    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == ''){
            closeModal(modalSelector);
        }
    });

    d.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    
    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByTab(){
        if (window.pageYOffset + d.documentElement.clientHeight >= d.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByTab);
        }
    }

    window.addEventListener('scroll', showModalByTab);   
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/remover.js":
/*!*******************************!*\
  !*** ./js/modules/remover.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function remover(trashSelector){
    //deleting side text panel
    const d = document;
    
    const shit = d.querySelector(trashSelector);
    shit.remove();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (remover);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    function setZero(num){
        if (num >= 0 && num < 10){
            return '0' + num;
        }
        else{
            return num;
        }
    }
    const d = document;
    //slider 1, 2

    const sliderSlides = d.querySelectorAll(slide),
          sliderMain = d.querySelector(container),
          sliderCounterPrevButton = d.querySelector(prevArrow),
          sliderCounterNextButton = d.querySelector(nextArrow),
          sliderCounterTotalNum = d.querySelector(totalCounter),
          sliderCounterCurrentNum = d.querySelector(currentCounter),
          sliderWrapper = d.querySelector(wrapper),
          sliderField = d.querySelector(field),
          width = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 0;
    let offset = 0;
    const totalSlideAmount = sliderSlides.length;

    sliderCounterTotalNum.textContent = `${setZero(totalSlideAmount)}`;
    sliderCounterCurrentNum.textContent = `${setZero(slideIndex+1)}`;

    sliderField.style.width = 100 * sliderSlides.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '1s all';
    sliderWrapper.style.overflow = 'hidden';



    sliderSlides.forEach((slide) => {
        slide.style.width = width;
    });

    sliderMain.style.position = 'relative';

    //???????????????????? ?????????????????????????????? ???????????????????????????? ????????????????
    let switchInterval,
        autoSlidesSwitching = true;//?????? ???????????????????? ???????????????????????????????????? ?????????????????? false
    
    function resetAutoSwitch(ms = 8000){
        if (autoSlidesSwitching == true){
            clearInterval(switchInterval);
            switchInterval = setInterval(setSlide, ms, slideIndex+1);
        }
    }

    function setSlide(i){
        if (i < 0){
            slideIndex = sliderSlides.length - 1;
        }
        else {
            if (i >= sliderSlides.length){
                slideIndex = 0;
            }
            else {
                slideIndex = i;
            }
        }
        offset = slideIndex * +width.slice(0, -2);
        sliderCounterTotalNum.textContent = `${setZero(totalSlideAmount)}`;
        sliderCounterCurrentNum.textContent = `${setZero(slideIndex+1)}`;
        sliderField.style.transform = `translateX(-${offset}px)`;
        //?????????????????????????? ???????????????? ??????????
        sliderIndicators.childNodes.forEach(dot => {
            dot.style.opacity = 0.5;
        });
        sliderIndicators.childNodes[slideIndex].style.opacity = 1;
        //?????????????? ???????????? ????????????????????????????????????
        resetAutoSwitch();
    }


    sliderCounterNextButton.addEventListener('click', () => {
        setSlide(slideIndex+1);
    });

    sliderCounterPrevButton.addEventListener('click', () => {
        setSlide(slideIndex-1);
    });

    //?????????????? ?????????????? ?????? ??????????
    const sliderIndicators = d.createElement('ol');//ordered list
    sliderIndicators.classList.add('slider-indicators');
    sliderIndicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 10px;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    sliderMain.append(sliderIndicators);
    

    //?????????????? ??????????????
    for (let i = 0; i < sliderSlides.length; i++) {
        const sliderDot = d.createElement('li');
        sliderDot.setAttribute('data-slide-to', i);
        sliderDot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 30px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: solid transparent;
            border-bottom: solid transparent;
            border-radius: 15px;
            opacity: 0.5;
            transition: opacity .6s ease;
        `;
        sliderIndicators.append(sliderDot);
        if (i == 0){
            sliderDot.style.opacity = 1;
        }
    }

    sliderIndicators.childNodes.forEach(dot => {
        dot.addEventListener('click', () => {
            setSlide(+dot.getAttribute('data-slide-to'));
        });
    });
    resetAutoSwitch();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const d = document;
    //tabs


    const tabs = d.querySelectorAll(tabsSelector),
          tabsContent = d.querySelectorAll(tabsContentSelector),
          tabsParent = d.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide', 'fade');
            item.classList.remove('show');
        });
        tabs.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();
    
    
    tabsParent.addEventListener('click', event=>{
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((item, i)=>{
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(deadLine, timerSelector){
    const d = document;
    //timer

    function getTimeRemaining(endTime){
        const t = Date.parse(endTime) - Date.parse(new Date()),//miliseconds differense
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor(t / (1000 * 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
    }

    function setZero(num){
        if (num >= 0 && num < 10){
            return '0' + num;
        }
        else{
            return num;
        }
    }

    //?????????????????? ?????? ???? ????????????????????, 
    //???????????????? ?????????????????????????? ??????????????????
    //?????????????????? ?????????????? ?? ????????????????????

    function setTimer (selector, time) {
        const timer = d.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(time);

            days.innerHTML = setZero(t.days);
            hours.innerHTML = setZero(t.hours);
            minutes.innerHTML = setZero(t.minutes);
            seconds.innerHTML = setZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
        
    }

    setTimer(timerSelector, deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResourses": () => (/* binding */ getResourses)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            'Content-type': 'application/json'
        }
    });

    return await res.json();//json-????????????
};

//

const getResourses = async(url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();//json-????????????
};






/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_remover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/remover */ "./js/modules/remover.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

/* jslint node: true */
/* jshint browser: true */













document.addEventListener('DOMContentLoaded', () => {
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__.default)('form','modal__dialog', '.modal');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal]', '.modal');
    (0,_modules_remover__WEBPACK_IMPORTED_MODULE_4__.default)('.sidepanel');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_6__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_7__.default)('2021-04-18', '.timer');
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map