import p5 from "p5"


/* Mouse virtualizado a.k.a. "Cursor" */
/* para detectar velocidad, aceleración, orientación, etc. */

export const Cursor = {
    cof: 0.1,
    
    position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    },

    dx: 0,
    dy: 0,
    distance: 0,

    update: function(_x, _y) {
        // Actualiza la posición actual
        this.position.x += this.dx * this.cof;
        this.position.y += this.dy * this.cof;

        this.getDistance(_x, _y);
    },

    getDistance: function(_x, _y) {
        // Calcula la distancia por puntos entre la posición deseada y la posición actual del cursor
        this.dx = _x - this.position.x;
        this.dy = _y - this.position.y;

        // Calcula la distancia total entre ambas coordenadas para ser usada después
        this.distance = Number(Math.sqrt( (this.dx * this.dx) + (this.dy * this.dy) )).toFixed(1);
        // console.log("distance: " + this.distance);
        // console.log(_x + " - " + this.position.x);
        // console.log(_y + " - " + this.position.y);
    }
}