import P5 from "p5";

const sketch = p => {

    var step = 30;
    var lines = [];
    var size;

    p.preload = function(){
        size = Math.min(p.windowHeight, p.windowWidth)-50;
    }

    p.setup = function() {
        p.createCanvas(size, size);
        p.frameRate(30);
        p.background(255);
        p.strokeWeight(2);
        p.smooth();
        p.pixelDensity(3.0);

        p.setuplines();
    }

    p.draw = function() {
        for(var i=2; i < lines.length; i++) {
            // p.noFill();
            p.fill(255);
            p.beginShape();
            for(var j=0; j < lines[i].length-2; j++) {
                var xc = (lines[i][j].x+lines[i][j+1].x)/2;
                var yc = (lines[i][j].y+lines[i][j+1].y)/2;
                p.vertex(lines[i][j].x, lines[i][j].y);
                p.quadraticVertex(xc,yc, lines[i][j+1].x, lines[i][j+1].y);
            }
            p.quadraticVertex(lines[i][j].x, lines[i][j].y, lines[i][j+1].x, lines[i][j+1].y);
            p.endShape();
        }
    }

    p.setuplines = function (){

        for(var i = step; i <= size-step; i += step) {
            var line = [];
            for(var j = step; j <= size-step; j += step) {
                var distanceToCenter = Math.abs(j - size/2);
                var variance = Math.max(size/2-50-distanceToCenter, 0);
                var random = Math.random() * variance / 2 * -1;
                var point = {x: j, y: i+random};
                line.push(point);
            }
            lines.push(line);
        }
    }

    p.mousePressed = function() {
        if (value == 0) {
            p.save('canvas.png');
        }
    }
}

new P5(sketch)
