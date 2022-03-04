export const PX_RATIO = window.devicePixelRatio;

import * as dat from 'dat.gui'

(function () {
    window.Utils = {};

    Utils.gui = new dat.GUI();
    // dat.GUI.toggleHide();
    Utils.debugger = {};

    Utils.sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    Utils.resizeCallbacks = [];

    function handleResize() {
        Utils.resizeCallbacks.forEach(cb => {
            cb();
        });
    }

    function updateWindowSize() {
        Utils.sizes.width = window.innerWidth;
        Utils.sizes.height = window.innerHeight;
    }

    Utils.resizeCallbacks.push(updateWindowSize);

    window.addEventListener( 'resize', debounce(handleResize, 100) );

    // window.capturer = new CCapture( {
    //     framerate: 60,
    //     verbose: true,
    //     format: 'png',
    //     timeLimit: 7
    // });

}) ();