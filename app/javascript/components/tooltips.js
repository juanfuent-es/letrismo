export default class Tooltips {
    constructor() {
        if ( !document.getElementsByClassName('Tooltip') ) return;
        this.getElements();
        this.addHandlers();
    }

    getElements() {
        var _this = this;

        this.tooltipsTriggers = [];
        this.tooltips = document.getElementsByClassName('Tooltip');
        for (let i = 0; i < _this.tooltips.length; i++) {
            _this.tooltipsTriggers.push(_this.tooltips[i].parentNode);
            
        }
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