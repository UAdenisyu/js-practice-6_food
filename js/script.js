/*jshint esversion: 6 */

const d = document;

d.addEventListener('DOMContentLoaded', () => {


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
});

