/* Mouse virtualizado a.k.a. "Cursor" */
/* para detectar velocidad, aceleración, orientación, etc. */

export const Cursor = {
    cof: 0.1,
    position: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        rotation: 0
    },
    dx: 0,
    dy: 0,
    distance: 0,
    angle: 0,

    update: function(_x, _y) {
        // Actualiza la posición actual
        this.position.x += this.dx * this.cof;
        this.position.y += this.dy * this.cof;

        this.getDistance(_x, _y);
        this.getRotation();
    },

    getDistance: function(_x, _y) {
        // Calcula la distancia por puntos entre la posición deseada y la posición actual del cursor
        this.dx = _x - this.position.x;
        this.dy = _y - this.position.y;

        // Calcula la distancia total entre ambas coordenadas para ser usada después
        this.distance = parseFloat( (Math.sqrt( (this.dx * this.dx) + (this.dy * this.dy) )).toFixed(2) );
        // console.log("distance: " + this.distance);
        // console.log(this.distance);
        // console.log(_x + " - " + this.position.x);
        // console.log(_y + " - " + this.position.y);
    },

    getRotation: function() {
        // this.angle = (Math.atan2(this.dy, this.dx) / Math.PI) * 180; /* Fórmula para calcular rotación en grados */
        this.angle = Math.atan2(this.dy, this.dx); /* Fórmula para calcular rotación en radianes */
        // console.log(this.angle);

        this.position.rotation += (this.angle - this.position.rotation) * this.cof;
        // console.log(this.position.rotation);
    }
}