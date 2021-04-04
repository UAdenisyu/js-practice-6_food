
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


const d = document;


d.addEventListener('DOMContentLoaded', () => {
    calc();
    cards();
    forms();
    modal();
    remover();
    slider();
    tabs();
    timer();
});
