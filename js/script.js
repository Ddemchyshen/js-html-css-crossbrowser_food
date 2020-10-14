window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    
    // Timer

    const deadline = '2020-11-01';

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

    setClock('.timer', deadline);

    // Modal

    const triggerModal = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    };

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    const modalTimer = setTimeout(showModal, 60000);
    
    triggerModal.forEach(item => {
        item.addEventListener('click', () => {
            showModal();
        })
    });  

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function removeModal() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', removeModal);
        }
    }

    window.addEventListener('scroll', removeModal);

    // Menu

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

    const getMenuItem = async url => {
        const result = await fetch(url)

        if (!result.ok) {
            throw new Error(`Не полкчилось обработать ${url}, статус ошибки ${result.status}`)
        }

        return await result.json();
    }

    // создание карточек меню через запрос json-server к файлу db.json и с использованием класса MenuItem
    getMenuItem('http://localhost:3000/menu')
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


    // Form

    const forms = document.querySelectorAll('form');
    const messageForm = {
        loading: "img/form/spinner.svg",
        success: "Данные отправлены. Мы вскоре свяжемся с Вами",
        failure: "Возникла ошибка. Пожалуйста, попробуйте ещё раз"
    };

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

            // создание json объекта с помощью методов .entries() .fromEntries()
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

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

            postData('http://localhost:3000/requests', json)
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
        showModal();

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
            closeModal();
        }, 3000);
    }

    forms.forEach(item => {
        bindPostForm(item);
    })
    
    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));

    // Slider

    const sliderImg = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          currentSlide = document.querySelector('#current'),
          totalSlides = document.querySelector('#total'),
          sliderPrev = document.querySelector('.offer__slider-prev'),
          sliderNext = document.querySelector('.offer__slider-next'),
          sliderWrapper = document.querySelector('.offer__slider-wrapper'),
          sliderInner = document.querySelector('.offer__slider-inner'),
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

});
