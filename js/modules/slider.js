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

export default slider;