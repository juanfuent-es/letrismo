// const EventEmitter = require('events')
import EventEmitter from 'https://cdn.jsdelivr.net/npm/events@3.3.0/+esm'

import isMobile from 'ismobilejs'
/**
 * Get real device screen size on desktop and mobile with orientation
 * @author juanfuent.es
 * @returns { object }
 */
//
window.event = new EventEmitter()

function onResizeWindow() {
    // Define constants globally
    window.WIDTH = window.innerWidth
    window.HEIGHT = window.innerHeight

    function mobileSize() {
        window.WIDTH = window.screen.width
        window.HEIGHT = window.screen.height
        if (isMobile.apple) sizeByOrientation() //All phones? Test on ipad and ipod
        // if (/iPad|iPhone|iPod/.test(navigator.userAgent)) sizeByOrientation()
    }

    function sizeByOrientation() {
        if (!Math.abs(window.orientation) == 90) return false
        window.WIDTH = window.screen.height
        window.HEIGHT = window.screen.width
    }

    if (isMobile(window.navigator).any) mobileSize()
    // const vh = height * .01 //Real size on visible viewport
    // document.documentElement.style.setProperty('--vh', `${vh}px`)
    window.HALF_X = window.WIDTH / 2
    window.HALF_Y = window.HEIGHT / 2

    window.event.emit('resize')
}

const debounce_event = window.debounce(80, () => onResizeWindow())
onResizeWindow()
//
const onResize = new ResizeObserver(debounce_event)
onResize.observe(document.body)