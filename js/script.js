/*jshint esversion: 6 */

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

    const deadLine = '2021-03-18';

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
    
    const modalTimerId = setTimeout(openModal, 50000);

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



    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню 'Фитнес'",
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        10,
        '.menu .container',
        "menu__item",
        'big'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню 'Премиум'",
        "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        19,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        "Меню 'Постное'",
        "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        15,
        '.menu .container',
        "menu__item"
    ).render();

    //forms
    const forms = d.querySelectorAll('form');
    const message = {
        loading : 'Идёт загрузка, пожалуйста, подождите',
        success : 'Данные получены',
        failure : 'Что-то пошло не так'
    };

    forms.forEach(item => {
        console.log(item);
        sendForm(item);
    });



    function sendForm(form){
        form.addEventListener('submit', e => {
            e.preventDefault();
            // showThankyouModal(message.loading);
            
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const obj = {};
            formData.forEach(function(value, key){
                obj[key] = value;
            });
            const json = JSON.stringify(obj);

            request.send(json);

            request.addEventListener('load', () => {
                
                if (request.status === 200){
                    console.log(request.response);
                    showThankyouModal(message.success);
                    form.reset();
                    
                } else {
                    showThankyouModal(message.failure);
                }
            });

            // const obj = {};
            // formData.forEach((value, key)=>{

            // });

        });
    }
    
    //forms update
        
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

});
