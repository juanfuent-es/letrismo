export class Particle {
	constructor(args) {
		this.cursor = args.cursor || false;

		this.position = {
			x: args.position.x,
			y: args.position.y
		};

		this.radius = args.radius || 20;
		// this.radius = args.radius || this.cursor.distance || 20;
		this.moveSpeed = this.cursor.distance || 10;
		this.rotation = args.rotation || this.cursor.angle || 0;

		this.width = 1;
		this.height = 1;
		this.baseSize = 20;
		this.speedMorph = 1;
		this.speedMorphScale = 5;

		this.frame = args.frame || 0;
		this.frameSpeed = 0.16;

		this.getSpeedMorph();
		this.applySpeedMorph();
	}

	animate() {
		// this.position.x ++;
		this.position.x -= Math.cos( this.frame ) * 2;
		this.position.y += Math.cos( this.frame ) * 2;
		// this.position.x -= Math.cos( this.frame ) * ((this.radius) / 10) ;
		// this.position.y += Math.cos( this.frame ) * ((this.radius) / 10) ;
		
		this.frame += this.frameSpeed;
	}


	getSpeedMorph() {
		let _dist = this.cursor.distance;
		let _min = 2;
		let _max_distance = 100;
		let _total = _dist / _max_distance;
		
		this.speedMorph = Number( Math.min(_total, _min).toFixed(2) );
		// console.log(this.speedMorph);
	}

	applySpeedMorph() {
		this.width = this.baseSize + (this.baseSize * this.speedMorph * this.speedMorphScale);
		// this.height = this.baseSize - (this.baseSize * this.speedMorph);
		this.height = this.baseSize;
	}
}