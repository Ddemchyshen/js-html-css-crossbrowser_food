/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const calculator = function() {
    const resultCalc = document.querySelector('.calculating__result span');
    let gender, ratio, height, weight, age;

    if (localStorage.getItem('gender')) { // проверка наличия записи gender в localStorage
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
        localStorage.setItem('gender', 'female'); // запись значения gender в localStorage по умолчанию (при пустом значении)
    }

    if (localStorage.getItem('ratio')) { // проверка наличия записи ratio в localStorage
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375); // запись значения ratio в localStorage по умолчанию (при пустом значении)
    }

    function checkLocalSettings(selector, activeClass) { // функция установки кнопок выбора согласно записям localStorage
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('gender')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        })
    }

    function totalCalculation() { // функция суммарного подсчета каллорий
        if(!gender || !height || !weight || !age || !ratio) {
            resultCalc.textContent = '???';
            return;
        }

        if(gender === 'female') {
            resultCalc.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio); // формула подсчета каллорий для женщин
        } else {
            resultCalc.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio); // формула подсчета каллорий для мужчин
        }
    }

    totalCalculation();

    function getSelectedInfo(selector, activeClass) { // функция получения значений с кнопок выбора
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', e => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // запись значения ratio в localStorage
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', e.target.getAttribute('id')); // запись значения gender в localStorage
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                })
    
                e.target.classList.add(activeClass);
    
                totalCalculation();
            });        
        })
    }

    function getInputInfo(selector) { // функция получения значений с полей ввода
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            
            if (input.value.match(/\D/g)) { // проверка на корректность вводимых данных с помощью регулярного выражения
                input.style.border = '2px solid rgb(255, 0, 0)';
                input.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            } else {
                input.style.border = 'none';
                input.style.backgroundColor = 'rgb(255, 255, 255)';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            totalCalculation();
        });
    }

    checkLocalSettings('#gender div', 'calculating__choose-item_active');
    checkLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    getSelectedInfo('#gender div', 'calculating__choose-item_active');
    getSelectedInfo('.calculating__choose_big div', 'calculating__choose-item_active');
    getInputInfo('#height');
    getInputInfo('#weight');
    getInputInfo('#age');

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



const form = function(modalTimer) {
    const forms = document.querySelectorAll('form');
    const messageForm = {
        loading: "img/form/spinner.svg",
        success: "Данные отправлены. Мы вскоре свяжемся с Вами",
        failure: "Возникла ошибка. Пожалуйста, попробуйте ещё раз"
    };

    function bindPostForm(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            
            statusMessage.src = messageForm.loading;
            statusMessage.classList.add('spinner');
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // создание объекта с помощь forEach используя данные FormData
            // const obj = {};
            // formData.forEach((item, i) => {
            //     obj[i] = item;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries())); // создание json объекта с помощью методов .entries() .fromEntries()

            // Работа с сервером с помощью AJAX
            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');
            // request.setRequestHeader('Content-type', 'application/json');
            // request.send(JSON.stringify(obj));
            // request.addEventListener('load', () => {
            //     if(request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(messageForm.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(messageForm.failure);
            //         statusMessage.remove();
            //     }
            // })

            (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(messageForm.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(messageForm.failure);
                statusMessage.remove();
            })
            .finally(() => {
                form.reset();
            })
        })
    }

    function showThanksModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)('.modal', modalTimer);

        const thanksModal = document.createElement('div');

        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>    
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.closeModal)('.modal');
        }, 3000);
    }

    forms.forEach(item => {
        bindPostForm(item);
    })
    
    fetch('http://localhost:3000/menu')
    .then(data => data.json());
    // .then(res => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/menu_card.js":
/*!*********************************!*\
  !*** ./js/modules/menu_card.js ***!
  \*********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


const menuCard = function() {
    class MenuItem {
        constructor(img, altimg, title, descr, price, menuParent, ...classes) {
            this.img = img;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.menuParent = menuParent;
            this.classes = classes;
            this.transfer = 27;
            this.transferPrice();
        }

        transferPrice() {
            this.price = this.price * this.transfer;
        }

        createMenuItem() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.el = 'menu__item';
                element.classList.add(this.el);
            } else {
                this.classes.forEach(item => element.classList.add(item));
            }
            element.innerHTML = `
                <img src=${this.img} alt=${this.altimg}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            document.querySelector(`${this.menuParent}`).append(element);
        }
    }

    // создание карточек меню через запрос json-server к файлу db.json и с использованием класса MenuItem
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getMenuItem)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuItem(img, altimg, title, descr, price, '.menu .menu__field .container').createMenuItem();
        })
    })

    // создание карточек меню через запрос json-server к файлу db.json (не используя класс MenuItem) 
    // function createMenuCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         price = 27 * price;

    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>
    //         `;
    //         document.querySelector('.menu .menu__field .container').append(element);
    //     })
    // }

    // getMenuItem('http://localhost:3000/menu')
    // .then(data => {
    //     createMenuCard(data);
    // })

    // создание карточек меню с помощью класса MenuItem
    // new MenuItem(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     '.menu .menu__field .container'
    // ).createMenuItem();
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuCard);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! namespace exports */
/*! export closeModal [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showModal [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "showModal": () => /* binding */ showModal,
/* harmony export */   "closeModal": () => /* binding */ closeModal
/* harmony export */ });
function showModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalTimer)  {
        clearInterval(modalTimer);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

const modal = function(triggerSelector, modalSelector, modalTimer) {

    const triggerModal = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
    
    triggerModal.forEach(item => {
        item.addEventListener('click', () => showModal('.modal', modalTimer));
    });  

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal('.modal');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal('.modal');
        }
    });

    function removeModal() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal('.modal', modalTimer);
            window.removeEventListener('scroll', removeModal);
        }
    }

    window.addEventListener('scroll', removeModal);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const slider = function({container, slide, current, total, next, prev, wrapper, inner}) {
    const sliderImg = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          currentSlide = document.querySelector(current),
          totalSlides = document.querySelector(total),
          sliderPrev = document.querySelector(prev),
          sliderNext = document.querySelector(next),
          sliderWrapper = document.querySelector(wrapper),
          sliderInner = document.querySelector(inner),
          width = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1,
        offset = 0;

  // Вариант слайдера с анимацией 

    function createDigit(string) {
      return +string.replace(/\D/g, '');
    }

    function currentSlideChecker() {    //проверка номера активного слайда и опциональное добавление "0" при отрисовке
        if(slideIndex < 10) {
          currentSlide.textContent = `0${slideIndex}`;
        } else {
          currentSlide.textContent = slideIndex;
        }
    }

    function sliderTransform() {    //смещение слайдера на размер offset
        sliderInner.style.transform = `translateX(-${offset}px)`;
    }

    sliderInner.style.width = 100 * sliderImg.length + '%'; // размер блока равен 100% умноженных на количество элементов в массиве
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden'; // всё выходящее за размеры блока будет скрыто

    sliderImg.forEach(item => item.style.width = width); // каждый элемент массива будет иметь 100% от расчитанной ширины блока в браузере

    if(sliderImg.length > 10) { // проверка вывода общего количества слайдов
        totalSlides.textContent = sliderImg.length;
        currentSlide.textContent = slideIndex;
    } else  {
        totalSlides.textContent = `0${sliderImg.length}`;
        currentSlide.textContent = `0${slideIndex}`;
    }

    slider.style.position = 'relative';

    const dotField = document.createElement('ol'), //создаем, стилизуем и размещаем поле в разметке, где будут размещены индикаторы слайдера
            dots = []; 
    
    dotField.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(dotField);

    for(let i = 0; i < sliderImg.length; i++) {
        const dot = document.createElement('li'); //создаем, стилизуем и размещаем точки слайдера

        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
            cursor: pointer;
        `;

        dotField.append(dot);
        dots.push(dot);

        if (i == 0) {
            dot.style.opacity = '1';
        }

    };

    sliderPrev.addEventListener('click', () => {
        if(offset == 0) {
            offset = createDigit(width) * (sliderImg.length - 1)
        } else {
            offset -= createDigit(width);
        }

        if(slideIndex == 1) {
            slideIndex = sliderImg.length;
        } else {
            slideIndex--;
        }

        currentSlideChecker();
        sliderTransform();

        dots.forEach(item => item.style.opacity = '0.5'); // изменяем активную точку слайдера
        dots[slideIndex - 1].style.opacity = '1';
    });

    sliderNext.addEventListener('click', () => {
        if(offset == createDigit(width) * (sliderImg.length - 1)) {
            offset = 0;
        } else {
            offset += createDigit(width);
        }

        if(slideIndex == sliderImg.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentSlideChecker();
        sliderTransform();

        dots.forEach(item => item.style.opacity = '0.5'); // изменяем активную точку слайдера
        dots[slideIndex - 1].style.opacity = '1';
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => { // переключение слайдов при нажатии на точку слайдера
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = createDigit(width) * (slideTo - 1);

            sliderTransform();

            dots.forEach(item => item.style.opacity = '0.5'); // изменяем активную точку слайдера
            dots[slideIndex - 1].style.opacity = '1';

            currentSlideChecker();

        })
    })

  // Вариант слайдера без анимации
  // if(sliderImg.length > 10) { // проверка вывода общего количества слайдов
  //     totalSlides.textContent = sliderImg.length;
  // } else  {
  //     totalSlides.textContent = `0${sliderImg.length}`;
  // }

  // function showSlide(slideIndex) {     // функция вывода нужного слайда и скрытия остальных
  //     sliderImg.forEach(item => {
  //         item.classList.remove('show');
  //         item.classList.add('hide');
  //     });
  //     sliderImg[slideIndex - 1].classList.add('show');

  //     if(slideIndex > 10) { // проверка вывода номера текущего слайда
  //         currentSlide.textContent = slideIndex;
  //     } else  {
  //         currentSlide.textContent = `0${slideIndex}`;
  //     }    
  // }

  // showSlide(slideIndex);

  // function slideChanger(n) {   // функция изменения номера индекса показываемого слайда, с проверками на максимальное и минимальное значения 
  //     slideIndex += n;

  //     if (slideIndex < 1) {
  //         slideIndex = sliderImg.length;
  //     }
  //     if(slideIndex > sliderImg.length) {
  //         slideIndex = 1;
  //     }

  //     showSlide(slideIndex);
  // }

  // sliderPrev.addEventListener('click', () => {
  //     slideChanger(-1);
  // })

  // sliderNext.addEventListener('click', () => {
  //     slideChanger(1);
  // })

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const tabs = function(tabsSelector, tabsContentSelector, tabsParentSelector, activeSelector) {
    let tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeSelector);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeSelector);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const timer = function(timerId, deadline) {
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor( (t/(1000*60*60*24)) ),
              seconds = Math.floor( (t/1000) % 60 ),
              minutes = Math.floor( (t/1000/60) % 60 ),
              hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(timerId, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_menu_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/menu_card */ "./js/modules/menu_card.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");









window.addEventListener('DOMContentLoaded', function() {
    const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.showModal)('.modal', modalTimer), 60000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_4__.default)('.timer', '2021-05-20');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)('[data-modal]', '.modal', modalTimer);
    (0,_modules_menu_card__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_1__.default)(modalTimer);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
        container: '.offer__slider', 
        slide: '.offer__slide', 
        current: '#current', 
        total: '#total', 
        next: '.offer__slider-next', 
        prev: '.offer__slider-prev', 
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner' 
    });
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__.default)();

});


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! namespace exports */
/*! export getMenuItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export postData [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getMenuItem": () => /* binding */ getMenuItem
/* harmony export */ });
// Работа с сервером с помощью fetch()
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    })

    return await result.json();
}

const getMenuItem = async url => {
    const result = await fetch(url)

    if (!result.ok) {
        throw new Error(`Не получилось обработать ${url}, статус ошибки ${result.status}`)
    }

    return await result.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map