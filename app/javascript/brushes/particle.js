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
		this.motionFrequency = 0.16;
		this.motionAmplitude = 3;
		
		this.rotationAmplitudeX = 0;
		this.rotationAmplitudeY = 1;

		this.lifespan = args.lifespan || 500; /* el tiempo durante el cual vivirá un pincel, el número decrece a cada frame; 0 es igual a muerte */
		this.motionLife = 1;
		this.mortality = args.mortality || false;

		this.getSpeedMorph();
		this.applySpeedMorph();
	}

	animate() {
		// console.log(this.lifespan);

		if (this.lifespan > 0) {
			// this.position.x ++;

			this.getRotationAmplitude();
			this.position.x += (Math.cos( this.frame ) * (this.motionAmplitude * this.rotationAmplitudeX) ) * this.motionLife;
			this.position.y += (Math.cos( this.frame ) * (this.motionAmplitude * this.rotationAmplitudeY) ) * this.motionLife;

			// this.position.x -= (Math.cos( this.frame ) * this.motionAmplitude) * this.motionLife;
			// this.position.y += (Math.cos( this.frame ) * this.motionAmplitude) * this.motionLife;

			// this.position.x -= Math.cos( this.frame ) * ((this.radius) / 10) ;
			// this.position.y += Math.cos( this.frame ) * ((this.radius) / 10) ;
			
			this.frame += this.motionFrequency;
			
			if (this.mortality) this.fadeAnimation();
		}
	}


	getSpeedMorph() {
		let _dist = this.cursor.distance;
		let _min = 20;
		let _max_distance = 150;
		let _total = _dist / _max_distance;
		
		this.speedMorph = Number( Math.min(_total, _min).toFixed(2) );
		// console.log(this.speedMorph);
	}

	applySpeedMorph() {
		this.width = this.baseSize + (this.baseSize * this.speedMorph * this.speedMorphScale);
		// this.height = this.baseSize - (this.baseSize * this.speedMorph);
		this.height = this.baseSize;
	}

	fadeAnimation() {
		this.motionLife -= (this.motionLife / this.lifespan);

		this.lifespan--;
		// console.log(this.lifespan);
	}

	getRotationAmplitude() {
		this.rotationAmplitudeX = Number( -Math.sin(this.rotation + Math.PI/4).toFixed(2) );
        this.rotationAmplitudeY = Number( Math.cos(this.rotation + Math.PI/4).toFixed(2) );

        // console.log('angle: ' + this.rotation.toFixed(1) + ' | x: ' + this.rotationAmplitudeX + ' | y: ' + this.rotationAmplitudeY);
	}
}






