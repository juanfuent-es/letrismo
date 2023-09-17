/**
 * @author JuanFuent.es
 * @created 13-02-2023
 * @name Mouse
 * @desc 
 */

import { Vector2 } from "three"
export default class Mouse {
    constructor() {
        this.pointer = new Vector2(1, 1)
        this.pressure = 0
        this.events()
    }

    events() {
        window.addEventListener('pointerdown', (e) => this.onPointerDown(e))
        window.addEventListener('pointermove', (e) => this.onPointerMove(e))
        window.addEventListener('pointerup', (e) => this.onPointerUp(e))
    }

    get x() {
        return this.pointer.x
    }
    /**
     * @param {Number} _x
     */
    set x(_x) {
        this.pointer.x = _x
    }
    //
    get y() {
        return this.pointer.y
    }
    /**
     * @param {Number} _y
     */
    set y(_y) {
        this.pointer.y = _y
    }

    onPointerDown(e) {
        this.pressure = e.pressure
    }

    onPointerMove(e) {
        this.x = e.clientX
        this.y = e.clientY
    }

    onPointerUp(e) {

    }
}