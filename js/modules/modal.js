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

export default modal;
export {showModal, closeModal};