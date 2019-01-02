import P5 from "p5"

const sketch = p => {

    var size;
    var line, dot,
        odd = false,
        lines = [],
        gap;

    p.preload = function(){
        // size = Math.min(p.windowHeight, p.windowWidth);
        size = 500;
    }

    p.setup = function() {
        p.createCanvas(size, size);
        p.frameRate(30);
        p.background(255);
        p.strokeWeight(0.5);

        gap = size/12;

        var ratio = 0.9;
        p.scale(ratio);
        p.translate(size*(1-ratio)/2, size*(1-ratio)/2);

        p.setupdot();
        p.drawlines();
        // p.drawout();
    }

    p.draw = function() {

    }

    p.setupdot = function() {
        for(var y = gap/2; y <= size; y+=gap) {
            odd = !odd;
            line = [];
            for(var x = gap/2; x <= size; x+=gap) {
                dot = {x: x + (odd ? gap/2 : 0), y: y};
                // line.push(dot);
                line.push({
                    x : x + (Math.random()*.8 - .4) * gap + (odd ? gap/2 : 0),
                    y : y + (Math.random()*.8 - .4) *gap
                });
                // p.fill(0);
                // p.noFill();
                // p.arc(dot.x,dot.y,50,50,0,2*Math.PI, p.CHORD);
                // p.point(dot.x, dot.y);
            }
            lines.push(line);
        }
    }

    p.drawTriangle = function(pa, pb, pc) {
        p.beginShape();
        p.stroke(0);
        // p.noFill();
        var gray = Math.floor(Math.random()*255);
        p.fill(gray);
        p.vertex(pa.x, pa.y);
        p.vertex(pb.x, pb.y);
        p.vertex(pc.x, pc.y);
        p.endShape(p.CLOSE);
    }

    p.drawlines = function() {
        var dotLine;
        odd = true;

        for(var y=0; y < lines.length-1; y++) {
            odd = !odd;
            dotLine = [];
            for(var i=0; i < lines[y].length; i++) {
                dotLine.push(odd ? lines[y][i]   : lines[y+1][i]);
                dotLine.push(odd ? lines[y+1][i] : lines[y][i]);
            }
            for(var i=0; i < dotLine.length-2; i++) {
                p.drawTriangle(dotLine[i+2], dotLine[i+1], dotLine[i]);
            }
        }
    }

    p.drawout = function() {
        p.stroke(0);
        p.strokeWeight(3);
        p.noFill();
        var offset = 30;
        p.rect(-offset, -offset, size+offset*2, size+offset*2);
    }

    p.keyPressed = function() {
        if(p.keyCode == 48) {
            p.save("canvas.png");
        }
    }
}

new P5(sketch)
