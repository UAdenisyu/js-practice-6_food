
/* jslint node: true */
/* jshint browser: true */
"use strict";


const d = document;

d.addEventListener('DOMContentLoaded', () => {
    const calc = require('./modules/calc'),
          cards = require('./modules/cards'),
          forms = require('./modules/forms'),
          modal = require('./modules/modal'),
          remover = require('./modules/remover'),
          slider = require('./modules/slider'),
          tabs = require('./modules/tabs'),
          timer = require('./modules/timer');

    calc();
    cards();
    forms();
    modal();
    remover();
    slider();
    tabs();
    timer();
});
