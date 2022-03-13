export default class Tooltips {
    constructor() {
        if ( !document.getElementsByClassName('Tooltip') ) return;
        this.getElements();
        this.addHandlers();
    }

    getElements() {
        this.tooltipsTriggers = [];
        this.tooltips = document.getElementsByClassName('Tooltip');
        this.tooltips.forEach(tooltip => {
            this.tooltipsTriggers.push(tooltip.parentNode)
        });
    }

    addHandlers() {
        var _this = this;
        this.tooltipsTriggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', _this.handleHoverIn.bind(_this));
            trigger.addEventListener('mouseleave', _this.handleHoverOut.bind(_this));
        });
    }

    handleHoverIn(e) {
        let tooltip = e.target.getElementsByClassName('Tooltip')[0];
        tooltip.classList.add('show');
    }
    
    handleHoverOut(e) {
        let tooltip = e.target.getElementsByClassName('Tooltip')[0];
        tooltip.classList.remove('show');
    }
}