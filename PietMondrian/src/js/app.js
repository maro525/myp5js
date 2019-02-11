import P5 from "p5";
import "../scss/style.scss"

const sketch = p => {

    var size, linewidth;
    var squares;
    var step;
    var white, colors;

    p.preload = function() {
        size = 600;
        linewidth = 8;
        squares = [{x:0, y:0, width:size, height:size}];
        step = size / 8;
        white = '#F2F5F1';
        colors = ['#D40920', '#1356A2', '#F7D842'];
    }

    p.setup = function() {
        p.createCanvas(size, size);
        p.frameRate(30);
        p.strokeWeight(linewidth);
        p.stroke(0);

        for (var i = 0; i < size; i += step) {
            p.splitSquareWith({x: i});
            p.splitSquareWith({y: i});
        }

        p.setColor();
    }

    p.setColor = function() {
        for (var i = 0; i < colors.length; i++) {
            squares[Math.floor(Math.random() * squares.length)].color = colors[i];
        }
    }

    p.draw = function() {

        for (var i = 0; i < squares.length; i++) {
            if(squares[i].color) {
                p.fill(squares[i].color);
            } else {
                p.fill(white);
            }
            p.rect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
        }
        
    }

    p.splitSquareWith = function(coordinates) {

        const {x, y} = coordinates;

        for (var i = squares.length - 1; i >= 0; i--) {
            const square = squares[i];

            if (x && x > square.x && x < square.x + square.width) {
                if(Math.random() > 0.5) {
                    squares.splice(i, 1);
                    p.splitOnX(square, x);
                }
            }

            if (y && y > square.y && y < square.y + square.height) {
                if(Math.random() > 0.5) {
                    squares.splice(i, 1);
                    p.splitOnY(square, y);
                }
            }
        }
    }

    p.splitOnX = function(square, splitAt) {

        var squareA = {
            x: square.x,
            y: square.y,
            width: square.width - (square.width - splitAt + square.x),
            height: square.height
        };

        var squareB = {
            x: splitAt,
            y: square.y,
            width: square.width - splitAt + square.x, 
            height: square.height
        };

        squares.push(squareA);
        squares.push(squareB);
    }

    p.splitOnY = function(square, splitAt) {

        var squareA = {
            x: square.x,
            y: square.y,
            width: square.width,
            height: square.height - (square.height - splitAt + square.y)
        };

        var squareB = {
            x: square.x,
            y: splitAt,
            width: square.width,
            height: square.height - splitAt + square.y
        };

        squares.push(squareA);
        squares.push(squareB);
    }

    p.keyPressed = function() {
        if (p.keyCode == 48) {
            p.save("canvas.png")
        }
    }
}

new P5(sketch);
