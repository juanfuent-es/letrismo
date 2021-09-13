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
        this.panelInfoSwitches = this.container.querySelectorAll('.Tool__show-equill-info');
        this.eQuillsInfoWrappers = this.container.querySelectorAll('.Tool__equill-info-wrapper');
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

    hideAllEquillsInfo() {
        var _this = this;
        for (const wrapper of _this.eQuillsInfoWrappers) {
            wrapper.classList.add('hide');
        }
    }

    // Event handlers
    events() {
        var _this = this;

        for (let i = 0; i < _this.tools.length; i++) {
            const tool = _this.tools[i];
            tool.querySelector('.Tool__hit').addEventListener('click', _this.handleToolClick.bind(_this));
        }

        for (const control of _this.panelInfoSwitches) {
            control.addEventListener('click', _this.handlePanelInfoSwitchClick.bind(_this));
        }

        // El dibujo de una forma requiere de 3 valores de color, background, relleno y stroke
        let changeColorInputs = document.querySelectorAll(".channel-input");
        // Se asigna evento a los inputs de cambio de valor, el evento se dispara al cambiar de valor
        for (let i = 0; i < changeColorInputs.length; i++) {
            changeColorInputs[i].addEventListener("change", (e) => {
                let _index = parseInt(e.target.getAttribute("data-index"));
                this.stage.rgb[_index] = e.target.value;
                this.stage.stroke_color = "rgb(" + this.stage.rgb.join(",") + ")";
                this.stage.fill_color = "rgb(" + this.stage.rgb.join(",") + ")";
        		window["rgb-sample"].style.backgroundColor = this.stage.stroke_color;
            });
        }


        this.stage.canvas.elt.addEventListener('mouseenter', _this.handleCanvasMouseEnter.bind(_this));
    }

    handleToolClick(e) {
        let toolIndex = this.tools.indexOf(e.target.parentNode);

        let wasOpen = this.modals[toolIndex].classList['value'].indexOf('hide') >= 0;
        this.closeModals();

        if (wasOpen) {
            this.modals[toolIndex].classList.remove('hide');
        } else {
            this.modals[toolIndex].classList.add('hide');
        }
    }

    handlePanelInfoSwitchClick(e) {
        this.hideAllEquillsInfo();
        let equillId = e.target.getAttribute('data-equill');
        this.eQuillsInfoWrappers[equillId].classList.remove('hide');
    }

    handleCanvasMouseEnter() {
        this.closeModals();
    }
}