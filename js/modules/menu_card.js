const menuCard = function() {
    // Menu Card

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
    
}

export default menuCard;