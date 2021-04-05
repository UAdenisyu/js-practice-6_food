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


export default modal;
export {closeModal};
export {openModal};