export default class ToolBar {
    constructor({parent}) {
        this.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        this.isIE = navigator.userAgent.toLowerCase().indexOf('MSIE') > -1;

        this.stage = parent.sketch;
        this.getElements();
        this.setStyles();
        this.events();
    }

    getElements() {
        this.container = window['ToolBar'];
        this.modals = this.container.querySelectorAll('.Tool__modal-container');
        this.getTools();
    }

    getTools() {
        this.tools = [];
        let tools = this.container.querySelectorAll('.Tool');
        for (let i = 0; i < tools.length; i++) {
            this.tools.push(tools[i]);
        }
    }

    setStyles() {
        if (this.isFirefox || this.isIE) for (let el of document.querySelectorAll('#tools, .Tools__modal-wrapper')) {
            el.classList.add('firefox-bg');
        }

        for (let e of document.querySelectorAll('input[type="range"].styled-slider')) {
            e.style.setProperty('--value', e.value);
            e.style.setProperty('--min', e.min == '' ? '0' : e.min);
            e.style.setProperty('--max', e.max == '' ? '100' : e.max);
            e.addEventListener('input', () => e.style.setProperty('--value', e.value));
        }
    }

    closeModals() {
        for (let i = 0; i < this.modals.length; i++) {
            const modal = this.modals[i];
            modal.classList.add('hide');
        }
    }

    // Event handlers
    events() {
        var _this = this;

        for (let i = 0; i < _this.tools.length; i++) {
            const tool = _this.tools[i];
            tool.querySelector('.Tool__hit').addEventListener('click', _this.handleToolClick.bind(_this));
        }
        this.stage.canvas.elt.addEventListener('mouseenter', _this.handleCanvasMouseEnter.bind(_this));
    }

    handleToolClick(e) {
        this.closeModals();
        let toolIndex = this.tools.indexOf(e.target.parentNode);
        this.modals[toolIndex].classList.remove('hide');
    }

    handleCanvasMouseEnter() {
        this.closeModals();
    }
}