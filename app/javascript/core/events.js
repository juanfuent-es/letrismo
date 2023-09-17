// const EventEmitter = require('events')
import EventEmitter from 'https://cdn.jsdelivr.net/npm/events@3.3.0/+esm'

const ee = new EventEmitter()
ee.on('resize', function (text) {
  console.log(text)
})
ee.emit('resize', 'hello world')


