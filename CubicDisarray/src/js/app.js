import P5 from "p5";

const sketch = p => {

    var size;
    var squareSize = 60
    var randomDisplacement = 20;
    var rotateMultiplier = 15;
    var offset = 5;

    p.preload = function() {
        size = Math.min(p.windowHeight, p.windowWidth);
    }

    p.setup = function() {
        p.createCanvas(size, size);
        p.frameRate(30);

        p.strokeWeight(2);
        p.smooth();
        p.pixelDensity(3.0);

        p.drawSquares();
    }

    p.draw = function() {

    }

    p.drawSquares = function() {
        for (var i=squareSize; i<=size-squareSize; i+= squareSize){
            for(var j=squareSize; j<=size-squareSize; j+=squareSize){
                var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                var rotateAmt = j / size * Math.PI / 180 * plusOrMinus * Math.random() * rotateMultiplier;

                plusOrMinus = Math.random < 0.5 ? -1 : 1;
                var translateAmt = j / size * plusOrMinus * Math.random() * randomDisplacement;

                p.push();
                p.translate(i + translateAmt + offset, j + offset);
                p.rotate(rotateAmt);
                p.drawSquare(squareSize, squareSize);
                p.pop();
            }
        }
    }

    p.drawSquare = function(w, h){
        p.noFill();
        p.rect(-w/2, -h/2, w, h);
    }

    p.keyPressed = function() {
        if(p.keyCode == 48) {
            p.save("canvs.png");
        }
    }
}

new P5(sketch)
