/*jshint esversion: 8 */

const d = document;

d.addEventListener('DOMContentLoaded', () => {

    //deleting side text panel

    const shit = d.querySelector('.sidepanel');
    shit.remove();

    //tabs

    const tabs = d.querySelectorAll('.tabheader__item'),
          tabsContent = d.querySelectorAll('.tabcontent'),
          tabsParent = d.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide', 'fade');
            item.classList.remove('show');
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();
    
    tabsParent.addEventListener('click', event=>{
        const target = event.target;
        
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i)=>{
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //timer

    const deadLine = '2021-04-18';

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

    setTimer('.timer', deadLine);

    //modal window

    const modalTrigger = d.querySelectorAll('[data-modal]'),
          modalWindow = d.querySelector('.modal'),
          modalCloseBtn = modalWindow.querySelector('[data-close]');


    function openModal(){
        modalWindow.classList.add('show', 'fade');
        d.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    
    function closeModal(){
        modalWindow.classList.remove('show', 'fade');
        d.body.style.overflow = 'auto';
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', (e) => {
            openModal();
        });
    });


    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    d.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });
    
    // const modalTimerId = setTimeout(openModal, 50000);

    function showModalByTab(){
        if (window.pageYOffset + d.documentElement.clientHeight >= d.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByTab);
        }
    }

    window.addEventListener('scroll', showModalByTab);
    

    //используем классы для карточек

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
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResourses = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();//json-формат
    };

    //getResourses() without axios

    // getResourses('http://localhost:3000/menu').
    // then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //     });
    // });

    axios.get('http://localhost:3000/menu')
    .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });


    //forms
    const forms = d.querySelectorAll('form');
    const message = {
        loading : 'Идёт загрузка, пожалуйста, подождите',
        success : 'Данные получены',
        failure : 'Что-то пошло не так'
    };
    



    function showThankyouModal(message){
        const prevModalDialog = d.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        openModal();//открывает все модальные окна

        const thankyouModal = d.createElement('div');
        thankyouModal.classList.add('modal__dialog');
        thankyouModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        thankyouModal.classList.add('fade');
        d.querySelector('.modal').append(thankyouModal);
        // проблема при повторном запуске модалки после отправления данных с предыдущей
        setTimeout(()=>{
            thankyouModal.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closeModal();
        }, 4000);
    } 


    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        });

        return await res.json();//json-формат
    };


    function bingPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
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


    //slider 1, 2

    const sliderSlides = d.querySelectorAll('.offer__slide'),
          sliderCounterPrevButton = d.querySelector('.offer__slider-prev'),
          sliderCounterNextButton = d.querySelector('.offer__slider-next'),
          sliderCounterTotalNum = d.getElementById('total'),
          sliderCounterCurrentNum = d.getElementById('current'),
          sliderWrapper = d.querySelector('.offer__slider-wrapper'),
          sliderField = d.querySelector('.offer__slider-inner');
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

    //добавление автоматического перелистывания слайдера
    let switchInterval,
        autoSlidesSwitching = true;//для отключения автоперелистывания поставить false
    
    function resetAutoSwitch(ms = 8000){
        if (autoSlidesSwitching == true){
            clearInterval(switchInterval);
            switchInterval = setInterval(switchNextSlide, ms);
        }
    }

    function doSliderVisualAnimation(){
        sliderCounterTotalNum.textContent = `${setZero(totalSlideAmount)}`;
        sliderCounterCurrentNum.textContent = `${setZero(slideIndex+1)}`;
        sliderField.style.transform = `translateX(-${offset}px)`;
    }

    function switchPrevSlide(step = 1){
        if ((offset == 0) || slideIndex-step <= 0){
            offset = +width.slice(0, -2) * (sliderSlides.length - 1);
            slideIndex = sliderSlides.length - 1;
        }
        else {
            offset -= +width.slice(0, -2);
            slideIndex -= step;
        }
        resetAutoSwitch();
        doSliderVisualAnimation();
    }

    function switchNextSlide(step = 1){
        if ((offset == +width.slice(0, -2) * (sliderSlides.length - 1)) || slideIndex+step >= sliderSlides.length){
            offset = 0;
            slideIndex = 0;
        }
        else {
            offset += +width.slice(0, -2);
            slideIndex += step;
        }
        resetAutoSwitch();
        doSliderVisualAnimation();
    }

    sliderCounterNextButton.addEventListener('click', () => {
        switchNextSlide();
    });

    sliderCounterPrevButton.addEventListener('click', () => {
        switchPrevSlide();
    });


    resetAutoSwitch();

    

    //простенький слайдер(установить в html классы hide для всех слайдов, кроме первого

    // let currentSlideIndex = 0,
    //     totalSlideAmount = 0;

    // sliderSlides.forEach(slide => {
    //     totalSlideAmount += 1;
    //     slide.classList.add('hide');
        
    // });

    // //Начальные настройки слайдера по умолчанию
    // // sliderSlides[0].classList.remove('hide');
    // // sliderSlides[0].classList.add('show', 'fade');
    // sliderCounterTotalNum.textContent = `${setZero(totalSlideAmount)}`;
    // sliderCounterCurrentNum.textContent = `${setZero(currentSlideIndex + 1)}`;


    // function setSlide(i = 0){
    //     //прячем текущий слайд
    //     sliderSlides[currentSlideIndex].classList.add('hide');
    //     sliderSlides[currentSlideIndex].classList.remove('show');
    //     //переключаемся на следующий/предыдущий слайд и показываем его
    //     if (i >= totalSlideAmount){
    //         i = 0;
    //     }
    //     else if (i < 0){
    //         i = totalSlideAmount - 1;
    //     }
    //     currentSlideIndex = i;
    //     sliderSlides[currentSlideIndex].classList.remove('hide');
    //     sliderSlides[currentSlideIndex].classList.add('show', 'fade');
    //     //визуальное изменение счётчика
    //     sliderCounterCurrentNum.textContent = `${setZero(currentSlideIndex + 1)}`;
    // }

    // setSlide();
    // console.log(sliderCounterCurrentNum);

    // sliderCounterNextButton.addEventListener('click', ()=>{
    //     setSlide(currentSlideIndex+1);
    // });
    
    // sliderCounterPrevButton.addEventListener('click', ()=>{
    //     setSlide(currentSlideIndex-1);
    // });


    // // function clearSelection() {
    // //     if (window.getSelection) {
    // //         window.getSelection().removeAllRanges();
    // //     } else { // старый IE
    // //         document.selection.empty();
    // //     }
    // // }
    // // sliderCounterPrevButton.addEventListener('dblclick', clearSelection);
    // // sliderCounterNextButton.addEventListener('dblclick', clearSelection);

});
