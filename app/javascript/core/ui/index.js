// const EventEmitter = require('events')
import EventEmitter from 'https://cdn.jsdelivr.net/npm/events@3.3.0/+esm'

import Cursor from "./cursor"

window.event = new EventEmitter()
window.CURSOR = new Cursor()

window.event.on('click', () => window.CURSOR.click())
window.event.on('animate', () => window.CURSOR.render())