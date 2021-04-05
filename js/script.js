
/* jslint node: true */
/* jshint browser: true */

"use strict";

import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import remover from './modules/remover';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';


document.addEventListener('DOMContentLoaded', () => {
    calc();
    cards();
    forms('form','modal__dialog', '.modal');
    modal('[data-modal]', '.modal');
    remover('.sidepanel');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('2021-04-18', '.timer');
});
