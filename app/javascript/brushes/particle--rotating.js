export class Particle_Rotating {
	constructor(args) {
		this.anchor = args.anchor || {x: window.innerWidth/2, y: window.innerHeight/2 }
		this.velocity = args.velocity || {x: 0, y: 0};
		this.circlingRadius = args.circlingRadius || 50;
		this.radius = args.radius || 20;
		
		this.position = { x: this.anchor.x, y: this.anchor.y };
		this.angle = args.angle || 0; /* posicion alrededor del cursor medido en radianes */
		this.frame = 0;
	}

	animate() {
		this.position.x = this.anchor.x + ( this.circlingRadius * Math.sin(this.frame * this.velocity.x + this.angle) );
		this.position.y = this.anchor.y + ( this.circlingRadius * Math.cos(this.frame * this.velocity.y + this.angle) );

		this.frame -= 0.05;
	}

	updateAnchor(_x, _y) {
		this.anchor.x = _x;
		this.anchor.y = _y;
	}

	cloneProperties() {
		var _this = this;
		return {
			anchor: _this.anchor,
			velocity: _this.velocity,
			circlingRadius: _this.circlingRadius,
			radius: _this.radius,
			position: _this.position,
			angle: _this.angle,
			frame: _this.frame,
		}
	}


}