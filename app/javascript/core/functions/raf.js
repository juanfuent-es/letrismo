// const EventEmitter = require('events')
import EventEmitter from 'https://cdn.jsdelivr.net/npm/events@3.3.0/+esm'

window.event = new EventEmitter()

function animate() {
    requestAnimationFrame(() => animate())
    window.event.emit('animate')
}

animate()