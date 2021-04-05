import {postData} from '../services/services';
import {openModal} from '../modules/modal';

function forms(formsSelector, modalDialogSelector, modalSelector){
    const d = document;
    //forms
    const forms = d.querySelectorAll(formsSelector);
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
        thankyouModal.classList.add(modalDialogSelector);
        thankyouModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        thankyouModal.classList.add('fade');
        d.querySelector().append(thankyouModal);
        // проблема при повторном запуске модалки после отправления данных с предыдущей
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
}

export default forms;