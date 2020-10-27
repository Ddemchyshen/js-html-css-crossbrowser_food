import {showModal, closeModal} from './modal';
import {postData} from '../services/services';

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
        showModal('.modal', modalTimer);

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
            closeModal('.modal');
        }, 3000);
    }

    forms.forEach(item => {
        bindPostForm(item);
    })
    
    fetch('http://localhost:3000/menu')
    .then(data => data.json());
    // .then(res => console.log(res));
}

export default form;