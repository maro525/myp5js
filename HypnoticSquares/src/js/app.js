import P5 from "p5";
import "../scss/style.scss"

const sketch = p => {

    var size,finalSize,startSize,startSteps, offset, tileStep, directions;

    p.preload = function() {
        size = 600;
        finalSize = 0.01;
        offset = 20;
        tileStep = (size - offset * 2) / 7;
        startSize = tileStep;
        startSteps = 4;
        directions = [-1, 0, 1];
    }

    p.setup = function() {
        p.createCanvas(size, size);
        p.frameRate(30);

        p.color(0);
        p.strokeWeight(4.0);
        // p.rect(0, 0, 600, 600);
        // p.drawRect(0, 0, startSize, startSize, -1, -1, startSteps);

        for(var x = offset; x < size-offset; x += tileStep){
            for(var y = offset; y < size - offset; y += tileStep) {
                startSteps = 2 + Math.ceil(Math.random() * 3);
                var xDirection = directions[Math.floor(Math.random() * directions.length)];
                var yDirection = directions[Math.floor(Math.random() * directions.length)];
                p.drawRect(x, y, startSize, startSize, xDirection, yDirection, startSteps-1);
            }
        }
    }

    p.draw = function() {

    }

    p.drawRect = function(x, y, width, height, xMovement, yMovement, steps) {
        console.log(x, y, width, height);
        p.rect(x,y, width, height);

        if(steps >= 0) {
            var newSize = (startSize) * (steps / startSteps) + finalSize;
            var newX = x + (width - newSize) / 2;
            var newY = y + (height- newSize) / 2;
            newX -= ((x - newX) / (steps + 2)) * xMovement;
            newY -= ((y - newY) / (steps + 2)) * yMovement;
            p.drawRect(newX, newY, newSize, newSize, xMovement, yMovement, steps-1);
        }

    }

    p.keyPressed = function() {
        if(p.keyCode == 48) {
            p.save("canvas.png");
        }
    }
}

new P5(sketch);
