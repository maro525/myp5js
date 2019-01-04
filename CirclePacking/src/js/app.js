import P5 from "p5";
import "../scss/style.scss";

const sketch = p => {

    var size;
    var circles=[],
        minRadius=2, maxRadius=350,
        totalCircles, createCircleAttempts;

    p.preload = function() {
        size = 600;
        totalCircles = 2400;
        createCircleAttempts = 1500;
    }

    p.setup = function() {
        p.createCanvas(size, size);
        p.frameRate(30);

        p.strokeWeight(2);

        p.setCircles();
    }

    p.draw = function() {

    }

    p.createAndDrawCircle = function() {

        var newCircle;
        var circleSafeToDraw = false;
        for(var tries = 0; tries < createCircleAttempts; tries++) {
            newCircle = {
                x: Math.floor(Math.random() * size),
                y: Math.floor(Math.random() * size),
                radius: minRadius
            }

            if(p.doesCircleHaveACollision(newCircle)) {
                continue;
            } else {
                circleSafeToDraw = true;
                break;
            }
        }

        if(!circleSafeToDraw) {
            return;
        }

        for(var radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
            newCircle.radius = radiusSize;
            if(p.doesCircleHaveACollision(newCircle)){
                newCircle.radius--;
                break;
            }
        }

        circles.push(newCircle);
        p.noFill();
        p.ellipse(newCircle.x, newCircle.y, newCircle.radius*2);
    }

    p.doesCircleHaveACollision = function(circle) {

        for(var i=0; i < circles.length; i++) {
            var otherCircle = circles[i];
            var a = circle.radius + otherCircle.radius;
            var x = circle.x - otherCircle.x;
            var y = circle.y - otherCircle.y;

            if(a >= Math.sqrt((x*x) + (y*y))) {
                return true;
            }
        }

        if(circle.x + circle.radius >= size || circle.x - circle.radius <= 0) {
            return true;
        }

        if(circle.y + circle.radius >= size || circle.y - circle.radius <= 0) {
            return true;
        }

        return false;
    }

    p.setCircles = function() {

        for(var i = 0; i < totalCircles; i++) {
            p.createAndDrawCircle();
        }
    }

    p.keyPressed = function() {
        if(p.keyCode == 48){
            p.save("canvs.png");
        }
    }
}

new P5(sketch);
