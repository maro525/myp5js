import P5 from "p5";
import "../scss/style.scss";

const sketch = p => {

    var step, aThirdOfHeight, size;

    p.preload = function() {
        size = 600;
        aThirdOfHeight = size/3;
        step = 40;
    }

    p.setup = function() {
        p.createCanvas(size, size);
        p.background(240);
        p.frameRate(10);
        p.strokeWeight(4);

        p.drawlines();
    }

    p.draw = function() {

    }

    p.drawlines = function() {
        p.background(240);
        for(var y=step; y < size-step; y+=step) {
            for(var x=step; x < size-step; x+=step) {
                if(y <aThirdOfHeight) {
                    p.drawline(x,y,step, step, [0.5]);
                } else if(y < aThirdOfHeight * 2) {
                    p.drawline(x,y,step,step,[0.2, 0.8]);
                } else {
                    p.drawline(x,y,step,step,[0.1,0.5,0.9]);
                }
            }
        }

        // p.save("cnvas###.png");
    }

    p.drawline = function(x, y, width, height, positions) {
        p.push();
        p.translate(x+width/2, y+height/2);
        p.rotate(Math.random()*5);
        p.translate(-width/2, -height/2);
        p.color(80);

        for(var i=0; i<=positions.length; i++){
            p.line(positions[i]*width,0,positions[i]*width, height);
        }
        p.pop();
    }

    p.keyPressed = function() {
        if(p.keyCode == 48){
            p.save("canvas.png");
        }
    }
}

new P5(sketch)
