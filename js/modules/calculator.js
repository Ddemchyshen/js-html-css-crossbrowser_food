const calculator = function() {
    // Calculator
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

export default calculator;