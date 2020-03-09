import P5 from "p5";
import "../scss/style.scss"
import Grid from "./grid"

const sketch = p => {
    let w, h, linewidth, bgColor;
    let grid;

    p.preload = () => {
        w = 900
        h = 900
        linewidth = 2
        bgColor = 255
        grid = new Grid(p, 0, 0, w, h)
    }

    p.setup = () => {
        p.createCanvas(w, h);
        p.frameRate(30);
        p.strokeWeight(linewidth);
        p.smooth()
        p.pixelDensity(2.0)
        p.background(bgColor)

        // grid.draw()
        grid.drawCurves()
    }

    p.draw = () => {

    }

    p.keyPressed = () => {
        if (p.key == 'P') {
            const d = new Date().toLocaleTimeString()
            p.save(`output/canvas-${d}.png`)
        }
    }
}

new P5(sketch);
