export default class ToolBar {
    constructor({parent}) {
        if (!window['ToolBar']) return;
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
        this.textToggles = this.container.querySelectorAll('.Tool__text-toggle');
        this.scrollingPanels = this.container.querySelectorAll('.Tool__Panel');
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

        document.body.style.overflow = 'hidden';
    }

    hideAllEquillsInfo() {
        var _this = this;
        for (const wrapper of _this.eQuillsInfoWrappers) {
            wrapper.classList.add('hide');
        }
        for (const switchEl of _this.panelInfoSwitches) {
            switchEl.classList.remove('showing');
        }
    }

    // Event handlers
    events() {
        var _this = this;

        for (let i = 0; i < _this.tools.length; i++) {
            const tool = _this.tools[i];
            tool.querySelector('.Tool__btn').addEventListener('click', _this.handleToolClick.bind(_this));
        }

        for (const control of _this.panelInfoSwitches) {
            control.addEventListener('click', _this.handlePanelInfoSwitchClick.bind(_this));
        }

        for (const panel of _this.scrollingPanels) {
            panel.addEventListener('scroll', _this.handlePanelScroll.bind(_this));
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

        _this.initTextTogglesListener();

        this.stage?.canvas?.elt.addEventListener('mouseenter', _this.handleCanvasMouseEnter.bind(_this));
        this.stage?.canvas?.elt.addEventListener('mouseleave', _this.handleCanvasMouseLeave.bind(_this));
    }

    initTextTogglesListener() {
        var _this = this;
        for (let i = 0; i < _this.textToggles.length; i++) {
            const options = _this.textToggles[i].querySelectorAll('.Tool__text-toggle__option');
            for (const option of options) {
                option.addEventListener( 'click', _this.handleTextToggleClick.bind(_this) );
            }
        }
    }

    /*
    * GETTER para acceder al modal abierto, en teoría sólo debería haber uno
    * Si todas los métodos de abajo funcionan a la perfección nunca debería haber abierto más de uno
    * En caso de que no exista uno activo devuelve falso
    */
    get modalActive() {
        return document.querySelector(".Tool__modal-container.active")
    }

    handleToolClick(e) {
        let prevModalActive = this.modalActive;
        this.closeModal(prevModalActive) // Mandar cerrar primero el probable modal abierto
        /* REVIEW
        * Es más fácil seleccionar por un atributo data o algo específico en el dom que por índices
        * Aparte que para dar mantenimiento futuro es más entendible, créeme, te lo agradecerás
        */
        let target = e.target.getAttribute("data-target")
        let modal = document.querySelector(target)
        if (this.isModalActive(modal)) return this.closeModal(modal)
        else if (prevModalActive != modal) return this.openModal(modal, e.target)
    }
    
    isModalActive(_modal) {
        if (_modal) {
            return _modal.classList['value'].indexOf('active') >= 0
        }
        return false
    }

    openModal(_modal, _icon) {
        if (_modal) {
            if (!this.isModalActive(_modal)) {
                if (_icon) _icon.classList.add('active');
                this.setScrollPointers(_modal);
                return _modal.classList.add('active');
            }
        }
        return false
    }

    /* Este pequeño método */
    closeModal(_modal) {
        if (_modal) {
            if (this.isModalActive(_modal)) {
                document.activeElement.blur()
                let toolButtons = this.container.querySelectorAll('.Tool__btn');
                toolButtons.forEach( btn => btn.classList.remove('active') );
                return _modal.classList.remove("active")
            }
        }
        return false
    }

    handlePanelInfoSwitchClick(e) {
        this.hideAllEquillsInfo();
        let equillId = e.target.getAttribute('data-equill');
        this.eQuillsInfoWrappers[equillId].classList.remove('hide');
        this.panelInfoSwitches[equillId].classList.add('showing');

        let modal = this.modalActive;
        if (modal) this.setScrollPointers(modal);
    }

    handleCanvasMouseEnter() {
        this.closeModal(this.modalActive)
        this.stage.preventDraw = false;
    }

    handleCanvasMouseLeave(e) {
        this.stage.preventDraw = true;
    }

    handleTextToggleClick(e) {
        let theme = e.target.getAttribute("data-theme");
        document.body.setAttribute("data-theme", theme);

        let hex = e.target.getAttribute("data-hex");
        window["letrism_bg"].value = hex;
        this.stage.bg_color = hex;

        let posIndex = e.target.getAttribute("data-option-index");

        let toggleBg = e.target.parentNode.parentNode.querySelector('.Tool__text-toggle__active-bg-wrap__element');
        gsap.to(toggleBg, 0.3, {
            ease: Power2.easeOut,
            x: `${100 * posIndex}%`
        });

        let options = e.target.parentNode.children;
        for (const option of options) {
            option.classList.remove('active');
        }
        options[posIndex].classList.add('active');
    }

    handlePanelScroll(e) {
        let panel = e.target;
        panel.classList.remove('scrollPointer');
    }

    setScrollPointers(target) {
        let panels = target.getElementsByClassName('Tool__Panel');
        if (!panels.length) return;

        window.requestAnimationFrame(_ => {
            for (const panel of panels) {
                panel.scrollTop = 0;
                panel.classList.remove('scrollPointer');
    
                let scrollable = panel.offsetHeight < panel.scrollHeight;
                if (scrollable) {
                    window.requestAnimationFrame(_ => {
                        panel.classList.add('scrollPointer');
                    });
                }
            }
        });
    }
}