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


    modalCloseBtn.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow){
            closeModal();
        }
    });

    d.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });
    
    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByTab(){
        if (window.pageYOffset + d.documentElement.clientHeight >= d.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByTab);
        }
    }

    window.addEventListener('scroll', showModalByTab);

});
