import P5 from "p5";
import "../scss/style.scss";
import Thing from "./thing";
import "p5/lib/addons/p5.sound";

const sketch = p => {

    let things = [];
    let N = 20;
    let K = 15;
    let M = K / N;
    let radius = 200;

    p.preload = function() {
        p.frameRate(30);
    }

    p.setup = function() {
        p.createCanvas(600, 600);

        for(let i=0; i < N; i++) {
            things.push(new Thing(p, M));
            things[i].setN(N);
        }

        p.background(0);
    }

    p.draw = function() {
        p.updatethings();

        p.background(30);
        p.drawthings();
    }

    p.updatethings = function() {
        for(let i=0; i<things.length; i++) {
            for(let j=0; j<things.length; j++) {
                things[i].addAffect(things[j].getPhase());
            }
            things[i].update();
        }
    }

    p.drawthings = function() {
        let br = 200;
        for(let i=0; i<things.length; i++) {
            let x = p.width/2 + br*p.cos(p.TWO_PI*i/N);
            let y = p.height/2 + br*p.sin(p.TWO_PI*i/N);
            things[i].draw();
        }
    }
    
}

new P5(sketch)