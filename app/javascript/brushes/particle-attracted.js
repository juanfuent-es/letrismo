export class Particle_Attracted {
	constructor(args) {
		this.velocity = {x: 0, y: 0};
		this.acceleration = {x: 0, y: 0};
		this.accelerationNormal = {x: 0, y: 0};
		this.accelerationScale = args.accelerationScale || .8;
		this.anchor = args.anchor || {x: window.innerWidth/2, y: window.innerHeight/2 }
		this.position = args.position || { 
			x: this.anchor.x + (Math.random() * 150 - 75),
			y: this.anchor.y + (Math.random() * 150 - 75)
		};

		this.radius = args.radius || 20;
		this.limit = args.limit || 10;
	}

	animate() {
		this.acceleration.x = this.anchor.x - this.position.x;
		this.acceleration.y = this.anchor.y - this.position.y;

		this.accelerationLength = Math.sqrt( Math.pow(this.acceleration.x, 2) + Math.pow(this.acceleration.y, 2) )
		this.accelerationNormal.x = (this.acceleration.x / this.accelerationLength) * this.accelerationScale;
		this.accelerationNormal.y = (this.acceleration.y / this.accelerationLength) * this.accelerationScale;
		// this.accelerationScale

		this.velocity.x += this.accelerationNormal.x;
		this.velocity.y += this.accelerationNormal.y;

		// limit
		if (this.velocity.x > this.limit) {
			this.velocity.x = this.limit;
		} else if(this.velocity.x < -this.limit) {
			this.velocity.x = -this.limit;
		}

		if (this.velocity.y > this.limit) {
			this.velocity.y = this.limit;
		} else if(this.velocity.y < -this.limit) {
			this.velocity.y = -this.limit;
		}


		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	updateAnchor(_x, _y) {
		this.anchor.x = _x;
		this.anchor.y = _y;
	}


}