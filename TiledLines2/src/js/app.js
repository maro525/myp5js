import "../scss/style.scss";
import P5 from "p5";

const sketch = p => {
    var step = 20;
    var size = p.windowWidth;

    p.perload = function() {

    }

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(30);
        p.background(255);

        for(var x=0; x<size; x+=step){
            for(var y=0; y<size; y+=step*2){
                p.drawline(x,y,step,step);
            }
        }

        p.save('canvas.png');
    }

    p.draw = function() {

    }

    p.drawline = function(x, y, width, height) {
        var a = Math.random();

        var stroke = Math.random() >= 0.9;
        if(stroke) p.strokeWeight(2);
        else p.strokeWeight(1);

        if(a>0.5) {
            p.line(x,y, x+width, y+height);
        }
        // else if(a > 0.4){
        else {
            p.line(x+width, y, x, y+height);
        }
    }
}

new P5(sketch)
