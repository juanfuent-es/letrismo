/**
 * @author JuanFuent.es
 * @name Cursor
 * @desc 
 */

import Mouse from "./mouse"
import { Vector2 } from "three"
import { lerp } from "three/src/math/MathUtils"

export default class Cursor {
    constructor() {
        this.mouse = new Mouse()
        this.container = document.createElement("div")
        document.body.appendChild(this.container)
        //
        this.shape = document.createElement("div")
        this.container.appendChild(this.shape)
        //
        this.position = new Vector2(1, 1)
        this.precision = 2
        this.scale = 1
        this.degrees = 0
        this.lerp = 0.9
        this.style()
    }

    style() {
        let style = `position:fixed;z-index:99;left:0;top:0;pointer-events:none;`
        this.container.setAttribute('style', style)
        let shapeStyle = `width:32px;height:32px;margin-top:-50%;margin-left:-50%;border-radius:50%;border:2px solid #F2DA63;background-color:#F24464;`
        this.shape.setAttribute('style', shapeStyle)
    }

    speed_morph() {
        const min = 0.3
        const max_distance = 500
        const total = this.dist / max_distance
        return Number(Math.min(total, min).toFixed(2))
    }

    update() {
        const speed_morph = this.speed_morph()
        this.scale += (speed_morph - this.scale) * this.lerp

        this.position.x = lerp(this.mouse.x, this.x, this.lerp)
        this.position.y = lerp(this.mouse.y, this.y, this.lerp)

        this.degrees = Math.atan2(this.dy, this.dx) * 180 / Math.PI
    }

    click() {
        console.log("Emit")
    }

    render() {
        this.update()

        this.container.style.transform = 'translate3d(' + this.x + 'px ,' + this.y + 'px, 0)';
        this.shape.style.transform = 'rotate(' + this.rotation + 'deg) ' + 'scale(' + (1 + this.scale) + ', ' + (1 - this.scale) + ')';
    }

    get x() {
        return this.position.x.toFixed(this.precision)
    }

    get rotation() {
        return this.degrees.toFixed(this.precision)
    }

    get y() {
        return this.position.y.toFixed(this.precision)
    }

    get dx() {
        return this.mouse.x - this.position.x
    }

    get dy() {
        return this.mouse.y - this.position.y
    }

    get dist() {
        return Math.hypot(this.dx, this.dy)
    }
}