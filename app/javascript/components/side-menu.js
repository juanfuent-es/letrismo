export const Side_Menu = {
    opened: false,

    container: undefined,
    triggers: [],
    items: [],

    init: () => {
        Side_Menu.getDOMElements();
        Side_Menu.addListeners();
    },
    
    getDOMElements: () => {
        Side_Menu.container = document.getElementById('side-menu');
        Side_Menu.triggers = document.getElementsByClassName('side-menu-trigger');
        Side_Menu.items = document.getElementsByClassName('side-menu-item');
    },
    
    addListeners: () => {
        window.addEventListener("mousewheel", () => Side_Menu.close())
        window.addEventListener("wheel", () => Side_Menu.close())
        for (let i = 0; i < Side_Menu.triggers.length; i++) {
            Side_Menu.triggers[i].addEventListener('click', Side_Menu.toggleShow);
        }
    },

    toggleShow: () => {
        if(!Side_Menu.opened) {
            Side_Menu.open();
        } else {
            Side_Menu.close();
        }
    },


    open: () => {
        Side_Menu.container.classList.add('opened');
        for (let i = 0; i < Side_Menu.items.length; i++) {
            let $item = Side_Menu.items[i];
            $item.classList.remove('animate');
            $item.setAttribute('data-cascade', 'show-up');
            $item.classList.add('animate');
        }
        Side_Menu.opened = true;
    },

    close: () => {
        Side_Menu.container.classList.remove('opened');
        for (let i = 0; i < Side_Menu.items.length; i++) {
            let $item = Side_Menu.items[i];
            $item.setAttribute('data-cascade', 'hide-down-out');
        }
        Side_Menu.opened = false;
    }
}