import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import menuCard from './modules/menu_card';
import form from './modules/form';
import slider from './modules/slider';
import calculator from './modules/calculator';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {
    const modalTimer = setTimeout(() => showModal('.modal', modalTimer), 60000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2021-05-20');
    modal('[data-modal]', '.modal', modalTimer);
    menuCard();
    form(modalTimer);
    slider({
        container: '.offer__slider', 
        slide: '.offer__slide', 
        current: '#current', 
        total: '#total', 
        next: '.offer__slider-next', 
        prev: '.offer__slider-prev', 
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner' 
    });
    calculator();

});
