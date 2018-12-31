import "../scss/style.scss";
import P5 from "p5";

const sketch = p => {
    var step = 30;
    var size = p.windowWidth;

    p.perload = function() {

    }

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(30);

        for(var x=0; x<size; x+=step){
            for(var y=0; y<size; y+=step){
                p.drawline(x,y,step,step);
            }
        }
    }

    p.draw = function() {

    }

    p.drawline = function(x, y, width, height) {
        var leftToRight = Math.random() >= 0.5;

        if(leftToRight) p.line(x,y, x+width, y+height);
        else p.line(x+width, y, x, y+height);
    }
}

new P5(sketch)
