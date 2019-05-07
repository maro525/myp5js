'use strict'

export default class Thing{
    
    constructor(p, m) {
        this.size = 10;
        this.p = p;

        this.natural_frequency = p.TWO_PI / 2 * Math.random();
        console.log(this.natural_frequency);

        this.circular_frequency = 0.0;
        this.phase = Math.random(0, this.p.TWO_PI);
        this.affect = 0.0;
        this.m = m;

        let clap = this.p.loadSound("../assets/clap.mp3");

    }

    setN(n_) { this.n = n_; }

    addAffect(theta) {
        let diff_angle = theta - this.phase;
        let affect_value = Math.sin(diff_angle);
        this.affect += affect_value;
        // console.log(affect_value);
    }

    getPhase() {
        return this.phase;
    }

    update() {
        let ss = this.m * this.affect;
        this.circular_frequency = this.natural_frequency + ss;
        this.affect = 0;

        this.phase += this.circular_frequency;
        this.phase = this.phase % this.p.TWO_PI;
    }

    playsound() {
        if(this.phase > 6.20) 
            clap.play();
        else if (clap.isPlaying())
            clap.stop();
    }

    draw() {
        let dr = 200;
        let px = this.p.width/2 + dr * Math.cos(this.phase);
        let py = this.p.height/2 + dr * Math.sin(this.phase);
        let r = 10;
        this.p.fill(255);
        this.p.ellipse(px, py, r);
    }

    drawAt(x, y) {
        let r = 3 + this.size * Math.abs(this.phase-this.p.PI);
        this.p.fill(255);
        this.p.ellipse(x, y, r);
    }
}
