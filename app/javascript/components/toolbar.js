export default class ToolBar {
    constructor({parent}) {
        this.stage = parent.sketch;
        this.getElements();
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