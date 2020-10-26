const modal = function() {
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

}

export default modal;