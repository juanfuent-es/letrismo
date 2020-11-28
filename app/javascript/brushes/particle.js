export class Particle {
	constructor(args) {
		this.position = {
			x: args.position.x,
			y: args.position.y
		};

		this.cursor = args.cursor || false;

		this.radius = args.radius || this.cursor.distance || 20;

		this.frame = args.frame || 0;
		this.frameSpeed = 0.16;
	}

	animate() {
		// this.position.x ++;
		this.position.x -= Math.cos( this.frame ) * 2;
		this.position.y += Math.cos( this.frame ) * 2;
		// this.position.x -= Math.cos( this.frame ) * ((this.radius) / 10) ;
		// this.position.y += Math.cos( this.frame ) * ((this.radius) / 10) ;
		
		this.frame += this.frameSpeed;
	}
}